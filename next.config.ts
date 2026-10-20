import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/projects/**", search: "?v=watermark-1" },
      { pathname: "/projects/**", search: "?v=watermark-2" },
    ],
  },
};

export default nextConfig;
