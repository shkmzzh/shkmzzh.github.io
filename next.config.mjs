/** @type {import('next').NextConfig} */

const nextConfig = {
  // Only use static export in non-development environments to keep local Next.js API routes working
  output: process.env.NODE_ENV === 'development' ? undefined : 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
