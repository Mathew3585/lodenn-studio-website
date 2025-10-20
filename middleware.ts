import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste des langues supportées
  locales: ['fr', 'en'],

  // Langue par défaut
  defaultLocale: 'fr',

  // Détection automatique de la langue basée sur Accept-Language header
  localeDetection: true,

  // Préfixe toujours présent dans l'URL (même pour la locale par défaut)
  localePrefix: 'always'
});

export const config = {
  // Matcher pour inclure toutes les routes sauf les fichiers statiques et API
  matcher: ['/', '/(fr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
