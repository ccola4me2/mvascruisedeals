/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site into ./out for Cloudflare Workers static assets.
  output: "export",
  // Static export serves .html files best with a trailing slash per route.
  trailingSlash: true,
  images: {
    // The optimizer needs a server; static export has none, so serve as-is.
    unoptimized: true,
  },
};

export default nextConfig;
