/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
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
}

export default nextConfig
