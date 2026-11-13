import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    port: '',
    pathname: '/**'
  }
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns
  },
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
