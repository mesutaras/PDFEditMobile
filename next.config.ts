import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: "path-browserify",
        crypto: false,
      };
    }
    return config;
  },
  // Prevent redirect issues with Google indexing
  trailingSlash: false,
  // Core Web Vitals optimization
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  // Silence Turbopack error and provide module aliases
  turbopack: {
    resolveAlias: {
      fs: "./src/lib/empty-module.ts",
      path: "path-browserify",
    },
  },
};

export default nextConfig;
