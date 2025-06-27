/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable static export for Firebase Hosting
  output: 'export',
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
  
  // Exclude functions directory from Next.js compilation
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'firebase-functions': 'firebase-functions',
        'firebase-admin': 'firebase-admin',
      });
    }
    return config;
  },
};

export default nextConfig;
