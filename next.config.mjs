import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",
    domains: [
      "res.cloudinary.com",
      "cdn.shopify.com",
      "lh3.googleusercontent.com",
      "facebook.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "facebook.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
