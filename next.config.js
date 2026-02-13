/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Generate 404.html for static hosting
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Expose build timestamp to client
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

module.exports = nextConfig;
