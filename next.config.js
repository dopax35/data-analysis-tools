/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/portal/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
