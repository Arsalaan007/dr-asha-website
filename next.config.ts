import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a static site into /out (GitHub Pages or any static host).
// BASE_PATH is set when the site lives in a sub-folder, e.g. "/dr-asha-website" on GitHub Pages.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT
    ? { output: "export" as const, images: { unoptimized: true }, trailingSlash: true }
    : {}),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
