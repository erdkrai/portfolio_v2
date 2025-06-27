/** @type {import('next').NextConfig} */

const nextConfig = {
  // Only enable static export for production builds
  ...(process.env.NODE_ENV === 'production' ? { 
    output: 'export',
    // Exclude studio from static export
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
      const pathMap = { ...defaultPathMap };
      // Remove all studio paths
      Object.keys(pathMap).forEach(path => {
        if (path.startsWith('/studio')) {
          delete pathMap[path];
        }
      });
      return pathMap;
    }
  } : {}),
  
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
