/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder art ships as SVG; skip the optimizer so it serves as-is.
    unoptimized: true,
  },
};

export default nextConfig;
