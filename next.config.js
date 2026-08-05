/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/portal',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portal/register',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
