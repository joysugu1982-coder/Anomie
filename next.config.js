/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    console.log("Using Webpack!");
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "**.myshopify.com",
      },
    ],
  },
};

module.exports = nextConfig;
