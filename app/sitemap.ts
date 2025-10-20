import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lodennstudio.com';
  const locales = ['fr', 'en'];
  const pages = ['', '/about', '/games/aetheris', '/contact'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add all pages for all locales
  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page === '/games/aetheris' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/games/aetheris' ? 0.9 : page === '/about' ? 0.8 : 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    });
  });

  return sitemap;
}
