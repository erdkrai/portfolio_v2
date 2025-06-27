import { Resend } from "resend";

export const POST = async (request: Request) => {
  const { email } = await request.json();

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "Newsletter service not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Create contact
  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: "Error subscribing to updates" },
      { status: 400 }
    );
  }
};
