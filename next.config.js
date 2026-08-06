/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/portal',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portal',
        permanent: true,
        basePath: false,
      },
    ];
  },
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

