import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photography is served from Supabase Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shrqarenzciqsetfnmpi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "vtfnzovghklayryozniz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
