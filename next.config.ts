import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // 違うディレクトリのlockfileを拾ってworkspace root推論がズレるのを防ぐ
    root: __dirname,
  },
};

export default nextConfig;
