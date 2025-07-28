
module.exports = {
  images: {
    remotePatterns: [new URL('https://t.me/**')],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://botapitest-server.onrender.com/:path*',
      },
    ];
  },
};
