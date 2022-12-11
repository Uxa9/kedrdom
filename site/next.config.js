/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '95.163.242.54',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
