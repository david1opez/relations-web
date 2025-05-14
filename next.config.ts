import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    OBJECT_ID: process.env.OBJECT_ID,
    REDIRECT_URL: process.env.REDIRECT_URL,
  },
};

export default nextConfig;