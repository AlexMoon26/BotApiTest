import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["t.me"]
  }
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://botapitest-server.onrender.com/:path*',
      },
    ];
  },
};

export default nextConfig;
