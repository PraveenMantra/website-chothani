import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mantra-smb-revamp.s3.us-east-1.amazonaws.com',
        pathname: '/public/gallery/**', 
      },
    ],
  },
};

export default nextConfig;
