import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com","cdn.discordapp.com","api.telegram.org"],
  },
};

export default nextConfig;
