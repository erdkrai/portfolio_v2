/** @type {import('next').NextConfig} */

const nextConfig = {
  // Conditionally enable static export for production builds
  ...(process.env.NODE_ENV === 'production' && process.env.DISABLE_STATIC_EXPORT !== 'true' 
    ? { output: 'export' } 
    : {}),
  
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
