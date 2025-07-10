/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
  },
};

export default nextConfig;