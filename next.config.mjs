/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["edge-tts"],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), "edge-tts"];
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
