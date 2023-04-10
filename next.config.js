/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unwojajwcbvfiyxybedi.supabase.co',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
