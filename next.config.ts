import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.deezer.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
