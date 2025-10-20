import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Liste des locales supportées
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  // Validation que la locale demandée est supportée
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'fr'; // Fallback to French
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
