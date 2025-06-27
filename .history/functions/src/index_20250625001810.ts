import * as functions from "firebase-functions";
import { Resend } from "resend";

// Initialize Resend with API key from Firebase config
const getResendClient = () => {
  const config = functions.config();
  const apiKey = config.resend?.api_key || process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error("Resend API key not configured");
  }
  
  return new Resend(apiKey);
};

// Newsletter subscription function
export const newsletter = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    const resend = getResendClient();
    const config = functions.config();
    const audienceId = config.resend?.audience_id || process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      res.status(503).json({ error: "Newsletter service not fully configured" });
      return;
    }

    // Create contact in Resend
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    functions.logger.info(`Newsletter subscription successful for: ${email}`);
    res.status(200).json({ success: true, message: "Successfully subscribed to newsletter" });

  } catch (error: any) {
    functions.logger.error("Newsletter subscription error:", error);
    
    // Handle specific Resend errors
    if (error.message?.includes("already exists")) {
      res.status(409).json({ error: "Email already subscribed" });
      return;
    }

    res.status(500).json({ 
      error: "Error subscribing to newsletter",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});
