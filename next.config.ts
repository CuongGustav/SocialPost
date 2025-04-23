/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.2.1", "http://localhost:3000"],
  images: {
    domains: ["127.0.0.1"], 
  },
};

module.exports = nextConfig;