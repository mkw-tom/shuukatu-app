/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: false,
  trailingSlash: false,
  experimental: {
    appDir: true,  // App Routerを有効にする設定
  },
}

export default nextConfig
