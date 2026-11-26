import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["21.0.10.116", "http://21.0.10.116:81", "http://21.0.10.116:3000"],
};

export default nextConfig;
