/** @type {import('next').NextConfig} */

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

export default nextConfig;
