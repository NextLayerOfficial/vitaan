import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "yash-vitaan-nextlayer-test.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "photos.google.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during build
  },
};

export default nextConfig;
