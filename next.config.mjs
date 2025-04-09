/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [320, 420, 768, 1024, 1200],
        loader: "default",
        domains: ["res.cloudinary.com", 'cdn.shopify.com', 'avatars.githubusercontent.com'],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "res.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;
