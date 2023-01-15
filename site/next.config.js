/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // loader: "kedrdom27",
    domains: ['kedrdom27.ru'],
    // path: "https://kedrdom.27.ru:5000"
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'kedrdom27.ru/',
    //     port: '5000',
    //     pathname: '/**',
    //   },
    // ],
  },
  experimental: {
    modern: true,
    scrollRestoration: true,
 }
}

module.exports = nextConfig
