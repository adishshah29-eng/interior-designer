import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },
  // @ts-ignore - Some TS versions might not have this in NextConfig types yet
  allowedDevOrigins: ['192.168.1.188'],
};

export default nextConfig;
