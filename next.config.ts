import type { NextConfig } from "next";

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URL = process.env.REDIRECT_URL;
const TENANT = "common";
const SCOPE = "openid profile User.Read"; 

const nextConfig: NextConfig = {
  env: {
    CLIENT_ID,
    OBJECT_ID: process.env.OBJECT_ID,
    REDIRECT_URL
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&response_mode=query&scope=${SCOPE}`,
        permanent: false,
        basePath: false
      }
    ]
  },
};

export default nextConfig;
