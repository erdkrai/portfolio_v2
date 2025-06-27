# Sanity Studio Deployment Guide

This guide explains how to deploy your Sanity Studio alongside your Next.js portfolio site on Firebase Hosting.

## Overview

The studio is now configured to work both locally and in production:
- **Development**: Studio runs at `http://localhost:3003/studio`
- **Production**: Studio will be available at `https://your-domain.com/studio`

## Configuration Changes Made

### 1. Next.js Configuration (`next.config.mjs`)

```javascript
const nextConfig = {
  // Only enable static export for production builds
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  
  trailingSlash: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};
```

**Key Changes:**
- Static export is only enabled in production
- This allows the studio to work properly in development mode
- In production, the static site will be generated without the studio routes

### 2. Studio Route (`app/studio/[[...tool]]/page.tsx`)

```typescript
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**Key Changes:**
- Simplified configuration without conflicting dynamic settings
- Uses standard Next.js App Router patterns

### 3. Firebase Configuration (`firebase.json`)

```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(html|json)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=3600"
          }
        ]
      }
    ],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

## Local Development

### Starting the Development Server

```bash
npm run dev
```

The studio will be available at:
- **Studio**: `http://localhost:3003/studio`
- **Website**: `http://localhost:3003`

### Accessing the Studio

1. Navigate to `http://localhost:3003/studio`
2. Sign in with your Sanity account
3. You can now edit content through the studio interface

## Production Deployment

### Important Note About Studio in Production

**The studio will NOT be included in the static export for security reasons.** This is intentional because:

1. **Security**: The studio should not be publicly accessible on a static hosting platform
2. **Functionality**: Static hosting cannot provide the dynamic features required by Sanity Studio
3. **Best Practice**: Content management should be done through secure, authenticated environments

### Recommended Production Setup

For production content management, you have several options:

#### Option 1: Use Sanity's Hosted Studio (Recommended)

1. Deploy your studio to Sanity's hosting:
   ```bash
   npx sanity deploy
   ```

2. Access your studio at: `https://your-project-name.sanity.studio`

3. This provides:
   - Secure authentication
   - Automatic updates
   - Better performance
   - Professional hosting

#### Option 2: Deploy Studio to a Separate Platform

Deploy the studio to a platform that supports dynamic applications:

1. **Vercel** (Recommended for Next.js):
   ```bash
   # Create a separate repository for just the studio
   # Deploy to Vercel with environment variables
   ```

2. **Netlify Functions**
3. **Railway**
4. **Render**

#### Option 3: Local Studio Only

Keep the studio for local development only:
- Content editors work locally
- Changes are pushed to the Sanity dataset
- The static site pulls content from Sanity

### Deploying the Static Site

The static site (without studio) can be deployed normally:

```bash
# Build the static site
npm run build

# Deploy to Firebase
firebase deploy
```

## Environment Variables

Ensure these environment variables are set:

### Local Development (`.env.local`)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token
```

### Production
Set the same variables in your hosting platform's environment configuration.

## Sanity CORS Configuration

For the studio to work properly, configure CORS in your Sanity project:

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS Origins**
4. Add your domains:
   - `http://localhost:3003` (for development)
   - `https://your-production-domain.com` (for production studio, if using Option 2)
   - `https://your-project-name.sanity.studio` (if using Sanity's hosted studio)

## Content Workflow

### Development Workflow
1. Start local development server: `npm run dev`
2. Access studio at `http://localhost:3003/studio`
3. Edit content in the studio
4. See changes reflected immediately on the site

### Production Workflow
1. Edit content through your chosen studio deployment (Option 1, 2, or 3)
2. Content changes are automatically available to your static site
3. Optionally trigger a rebuild/redeploy of your static site for updated content

## Troubleshooting

### Studio Not Loading
- Check that the development server is running
- Verify environment variables are set correctly
- Check browser console for CORS errors

### CORS Errors
- Add your domain to Sanity CORS settings
- Ensure the correct project ID is configured

### Build Errors
- Ensure `NODE_ENV=production` is set during production builds
- Check that all required environment variables are available

## Security Considerations

1. **Never expose write tokens** in client-side code
2. **Use read-only tokens** for the frontend
3. **Restrict CORS origins** to only necessary domains
4. **Use Sanity's hosted studio** for maximum security

## Next Steps

1. Choose your preferred studio deployment method
2. Configure CORS settings in Sanity
3. Set up your production environment variables
4. Deploy your static site to Firebase
5. Test the complete workflow

Your portfolio site is now ready for production with a fully functional content management system!
