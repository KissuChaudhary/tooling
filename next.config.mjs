/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'data',
        hostname: '',
      },
    ],
  },
}

export default nextConfig
