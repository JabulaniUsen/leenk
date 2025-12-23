/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Turbopack configuration (Next.js 16 default)
  // Empty config silences the warning - Turbopack handles server-only modules automatically
  turbopack: {},
  // Webpack configuration for non-Turbopack builds (fallback)
  webpack: (config, { isServer }) => {
    // Exclude nodemailer from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      }
    }
    return config
  },
}

export default nextConfig
