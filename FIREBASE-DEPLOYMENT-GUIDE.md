# Firebase Deployment Guide

This guide will help you deploy your Next.js portfolio with Sanity CMS to Firebase Hosting with Firebase Functions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Firebase CLI installed globally: `npm install -g firebase-tools`
- A Firebase project created at [Firebase Console](https://console.firebase.google.com)

### 1. Firebase Project Setup

1. **Create Firebase Project**
   ```bash
   # Login to Firebase
   firebase login
   
   # Create new project (or use existing)
   firebase projects:create your-project-id
   ```

2. **Update Project ID**
   - Edit `.firebaserc` and replace `"your-project-id"` with your actual Firebase project ID

3. **Initialize Firebase (if needed)**
   ```bash
   firebase init
   # Select: Functions, Hosting
   # Choose existing project
   # Accept defaults for most options
   ```

### 2. Environment Variables Setup

#### For Firebase Functions:
```bash
# Set Resend API credentials
firebase functions:config:set resend.api_key="your-resend-api-key"
firebase functions:config:set resend.audience_id="your-resend-audience-id"

# View current config
firebase functions:config:get
```

#### For Local Development:
Create `.env.local` file:
```env
RESEND_API_KEY=your-resend-api-key
RESEND_AUDIENCE_ID=your-resend-audience-id
```

### 3. Install Dependencies

```bash
# Install main project dependencies
pnpm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 4. Build and Deploy

#### Full Deployment:
```bash
npm run deploy
```

#### Deploy Only Hosting:
```bash
npm run deploy:hosting
```

#### Deploy Only Functions:
```bash
npm run deploy:functions
```

### 5. Test Locally

```bash
# Start Firebase emulators
npm run firebase:serve

# Your site will be available at:
# - Hosting: http://localhost:5000
# - Functions: http://localhost:5001
```

## 📁 Project Structure

```
portfolio-v2/
├── functions/              # Firebase Functions
│   ├── src/
│   │   └── index.ts       # Newsletter API endpoint
│   ├── package.json
│   └── tsconfig.json
├── out/                   # Next.js static export (generated)
├── firebase.json          # Firebase configuration
├── .firebaserc           # Firebase project settings
└── next.config.mjs       # Next.js config (static export enabled)
```

## 🔧 Configuration Details

### Firebase Functions
- **Runtime**: Node.js 18
- **Newsletter API**: `/api/newsletter` → Firebase Function
- **CORS**: Enabled for all origins
- **Error Handling**: Comprehensive error responses

### Firebase Hosting
- **Static Files**: Served from `out/` directory
- **Rewrites**: API routes redirected to Functions
- **Caching**: Optimized for static assets
- **SSL**: Automatic HTTPS

### Next.js Configuration
- **Output**: Static export (`output: 'export'`)
- **Images**: Unoptimized for static hosting
- **Trailing Slash**: Enabled for better routing
- **API Routes**: Disabled (handled by Functions)

## 🌐 Custom Domain Setup

1. **Add Domain in Firebase Console**
   - Go to Hosting → Add custom domain
   - Follow verification steps

2. **Update DNS Records**
   - Add A records pointing to Firebase IPs
   - Firebase will provide specific instructions

3. **SSL Certificate**
   - Automatically provisioned by Firebase
   - Usually takes 24-48 hours

## 🔄 CI/CD with GitHub Actions

### Setup GitHub Secrets:
1. Generate Firebase token: `firebase login:ci`
2. Add to GitHub repository secrets:
   - `FIREBASE_SERVICE_ACCOUNT`: Service account JSON
   - `FIREBASE_TOKEN`: CLI token

### Workflow File:
The workflow is automatically triggered on pushes to `main` branch.

## 📊 Monitoring & Analytics

### Firebase Console
- **Hosting**: View deployment history and traffic
- **Functions**: Monitor function executions and logs
- **Performance**: Track Core Web Vitals

### Function Logs
```bash
# View function logs
firebase functions:log

# View specific function logs
firebase functions:log --only newsletter
```

## 🐛 Troubleshooting

### Common Issues:

1. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next out
   npm run build
   ```

2. **Function Deployment Errors**
   ```bash
   # Check function logs
   firebase functions:log
   
   # Deploy functions only
   npm run deploy:functions
   ```

3. **Environment Variables Not Working**
   ```bash
   # Check Firebase config
   firebase functions:config:get
   
   # Update config
   firebase functions:config:set resend.api_key="new-key"
   ```

4. **Newsletter API Not Working**
   - Verify Resend API key and audience ID
   - Check CORS settings
   - Review function logs for errors

### Performance Optimization:

1. **Image Optimization**
   - Use Sanity's image CDN with proper parameters
   - Implement responsive images
   - Add proper alt tags

2. **Caching**
   - Static assets cached for 1 year
   - HTML files cached for 1 hour
   - Function responses can be cached

3. **Bundle Size**
   - Use dynamic imports for large components
   - Optimize dependencies
   - Remove unused code

## 💰 Cost Estimation

### Firebase Free Tier:
- **Hosting**: 10GB storage, 10GB/month transfer
- **Functions**: 2M invocations/month, 400K GB-seconds
- **Bandwidth**: 10GB/month

### Typical Portfolio Costs:
- **Free Tier**: $0/month (sufficient for most portfolios)
- **Light Usage**: $5-15/month
- **Heavy Usage**: $25-50/month

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit API keys to repository
   - Use Firebase Functions config for production
   - Use `.env.local` for development

2. **CORS Configuration**
   - Restrict origins in production
   - Use specific domains instead of `*`

3. **Function Security**
   - Validate input data
   - Implement rate limiting
   - Use proper error handling

## 📈 Next Steps

1. **Set up monitoring and alerts**
2. **Configure custom domain**
3. **Implement analytics tracking**
4. **Set up backup strategies**
5. **Optimize performance metrics**

## 🆘 Support

- **Firebase Documentation**: https://firebase.google.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Sanity Documentation**: https://www.sanity.io/docs

For project-specific issues, check the function logs and deployment history in the Firebase Console.
