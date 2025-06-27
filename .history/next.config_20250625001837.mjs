/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable static export for Firebase Hosting
  output: 'export',
  trailingSlash: true,
  
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  
  // Disable API routes for static export (they'll be handled by Firebase Functions)
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
