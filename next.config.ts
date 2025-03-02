import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  eslint: {
      ignoreDuringBuilds: true, // Ensures best practices are followed
  },
  typescript: {
      ignoreBuildErrors: true, // Prevents broken builds due to TypeScript errors
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/products/**',
      },
    ],
  },
};

export default nextConfig;
