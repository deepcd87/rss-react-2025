/** @type {import('next').NextConfig} */
import nextIntlPlugin from 'next-intl/plugin';

const withNextIntl = nextIntlPlugin();

const nextConfig = withNextIntl({
  // output: 'export',
  distDir: './dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
});

export default nextConfig;
