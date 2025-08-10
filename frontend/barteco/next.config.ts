import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //for cloudinary to using next image component explicitly tell the domain
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
