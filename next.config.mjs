/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/product-images/**",
      },
    ],
  },
};

export default nextConfig;
