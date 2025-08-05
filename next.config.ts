import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during build
  },
};

export default nextConfig;
