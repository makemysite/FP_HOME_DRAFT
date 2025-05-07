
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'fieldpromax.com',
      'ik.imagekit.io', // Adding imagekit domain for optimization
      'cdn.builder.io', // Adding builder.io domain for hero images
      // Add any other image domains you're using, like Supabase storage domains
    ],
  },
  // Optional: Configure redirects or rewrites if needed
  async redirects() {
    return [
      // Example redirect
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // }
    ];
  },
  // Optional: Configure webpack if needed
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here
    return config;
  },
};

export default nextConfig;
