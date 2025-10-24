import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Désactiver les polyfills pour les navigateurs modernes
  experimental: {
    // @ts-ignore - Next.js 15 expérimental
    browsersListForSwc: true,
  },
  // Cibler uniquement les navigateurs modernes
  compiler: {
    // Retirer les polyfills inutiles
  },
};

export default withNextIntl(nextConfig);
