/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // Add this to handle dynamic pages better
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig