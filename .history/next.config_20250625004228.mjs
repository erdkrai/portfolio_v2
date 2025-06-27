/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable static export for Firebase Hosting
  output: 'export',
  trailingSlash: true,
  
  // Skip static generation for studio routes
  skipTrailingSlashRedirect: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  
  // Exclude studio from static export
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // Remove studio paths from static export
    const pathMap = { ...defaultPathMap };
    delete pathMap['/studio'];
    return pathMap;
  },
};

export default nextConfig;
