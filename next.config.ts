import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeping your existing config
  // @ts-ignore - allowing your custom dev property
  allowedDevOrigins: ['192.168.1.6'],

  // ⚡ The redirect traffic cop
  async redirects() {
    return [
      {
        source: '/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;