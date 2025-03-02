import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["source.unsplash.com"], //  外部画像のホストを許可
  },
};

export default nextConfig;
