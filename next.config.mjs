/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.stability.ai',
      },
    ],
    domains: ['fal.media', 'replicate.delivery'],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/ai-image-generator',  
        destination: '/tools/ai-image-generator',  
        permanent: true,  
      },
      {
        source: '/ai-text-to-speech',
        destination: '/tools/ai-text-to-speech',
        permanent: true,
      },
    ];
  },
   webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig
