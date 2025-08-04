const {
  createVanillaExtractPlugin,
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  swcMinify: true,
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_JSON_SERVER_PORT: process.env.NEXT_PUBLIC_JSON_SERVER_PORT,
  },
};

module.exports = withVanillaExtract(nextConfig);
