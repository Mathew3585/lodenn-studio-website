import Script from 'next/script';

export function OrganizationSchema({ locale = 'fr' }: { locale?: string }) {
  const isEnglish = locale === 'en';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lodenn Studio',
    description: isEnglish
      ? 'Independent video game studio based in Brittany, France. Creators of Aetheris.'
      : 'Studio de jeux vidéo indépendant basé en Bretagne, France. Créateurs d\'Aetheris.',
    url: 'https://lodennstudio.com',
    logo: 'https://lodennstudio.com/images/logo.avif',
    foundingDate: '2025',
    founders: [
      {
        '@type': 'Person',
        name: 'Lodenn Studio Team',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Bretagne',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://twitter.com/lodennstudio',
      'https://instagram.com/lodennstudio',
      'https://youtube.com/@lodennstudio',
      'https://tiktok.com/@lodennstudio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `https://lodennstudio.com/${locale}/contact`,
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function VideoGameSchema({ locale = 'fr' }: { locale?: string }) {
  const isEnglish = locale === 'en';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Aetheris',
    description: isEnglish
      ? 'Stylized survival and exploration game set in a world of floating islands. Gather resources, craft tools, build your airship and explore a mysterious universe.'
      : 'Jeu de survie et d\'exploration stylisé dans un monde d\'îles flottantes. Récoltez des ressources, craftez des outils, construisez votre dirigeable et explorez un univers mystérieux.',
    genre: ['Survival', 'Exploration', 'Crafting', 'Adventure'],
    gamePlatform: 'PC',
    playMode: ['SinglePlayer', 'MultiPlayer'],
    applicationCategory: 'Game',
    operatingSystem: 'Windows',
    url: `https://lodennstudio.com/${locale}/games/aetheris`,
    image: 'https://lodennstudio.com/images/aetheris/illu-1.webp',
    author: {
      '@type': 'Organization',
      name: 'Lodenn Studio',
      url: 'https://lodennstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lodenn Studio',
      url: 'https://lodennstudio.com',
    },
    inLanguage: isEnglish ? 'en-US' : 'fr-FR',
    gameTip: isEnglish
      ? 'Explore floating islands, gather resources and build your airship to survive in the skies.'
      : 'Explorez les îles flottantes, récoltez des ressources et construisez votre dirigeable pour survivre dans les cieux.',
  };

  return (
    <Script
      id="videogame-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema({ locale = 'fr' }: { locale?: string }) {
  const isEnglish = locale === 'en';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lodenn Studio',
    description: isEnglish
      ? 'Independent Breton video game studio'
      : 'Studio de jeux vidéo indépendant breton',
    url: 'https://lodennstudio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lodennstudio.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
