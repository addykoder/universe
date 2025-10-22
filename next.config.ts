import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**', // This pattern allows all Google user profile images
      },
    ],
  },
};

export default nextConfig;
