import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oplydfuaxpsebwxjwipq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      }
    ],
  },
};

export default nextConfig;
