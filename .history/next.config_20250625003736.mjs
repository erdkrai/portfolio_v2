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
  
  // Exclude Sanity Studio from static export
  async generateBuildId() {
    return 'build'
  },
  
  async exportPathMap(defaultPathMap) {
    // Remove studio routes from static export
    const pathMap = { ...defaultPathMap };
    delete pathMap['/studio'];
    delete pathMap['/studio/[[...tool]]'];
    return pathMap;
  },
};

export default nextConfig;
