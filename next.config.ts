import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MSFT_CLIENT_ID: process.env.MSFT_CLIENT_ID,
    MSFT_REDIRECT_URI: process.env.MSFT_REDIRECT_URI,
  },
  images: {
    domains: ["photos.fife.usercontent.google.com", "images.ctfassets.net", "plus.unsplash.com"],
  },
};


export default nextConfig;
