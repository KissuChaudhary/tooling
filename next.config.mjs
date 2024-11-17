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
    domains: ['fal.media', 'replicate.delivery', 'www.googleapis.com', 'youtube.com', 'youtu.be'],
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
      async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
}

export default nextConfig
