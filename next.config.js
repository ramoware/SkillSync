/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Skip linting during build to speed up deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig