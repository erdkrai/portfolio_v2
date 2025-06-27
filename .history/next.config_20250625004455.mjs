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
  
  // Skip static generation for studio routes during build
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    if (dev) {
      return defaultPathMap;
    }
    
    // Remove studio paths from static export
    const pathMap = { ...defaultPathMap };
    Object.keys(pathMap).forEach(path => {
      if (path.startsWith('/studio')) {
        delete pathMap[path];
      }
    });
    
    return pathMap;
  },
};

export default nextConfig;
