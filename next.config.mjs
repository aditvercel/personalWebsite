/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Allow images from this domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Add Cloudinary here
        port: "", // Optional: only include if needed
        pathname: "/**", // Allow all paths from Cloudinary
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Allow images from Picsum
        port: "", // Optional: only include if needed
        pathname: "/**", // Allow all paths from Picsum
      },
    ],
  },
};

export default nextConfig;
