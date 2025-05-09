
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
      // Handle admin path redirection to the separate admin application
      {
        source: '/admin',
        destination: process.env.ADMIN_URL || '/admin-not-configured',
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: process.env.ADMIN_URL || '/admin-not-configured',
        permanent: false,
      }
    ];
  },
  // Optional: Configure webpack if needed
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here
    return config;
  },
};

export default nextConfig;
