/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kedrdom27.ru/',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
