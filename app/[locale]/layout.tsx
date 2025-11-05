import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import PageTransitionHandler from '@/components/PageTransitionHandler';
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Analytics from '@/components/Analytics';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return {
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    icons: {
      icon: '/favicon.avif',
      shortcut: '/favicon.avif',
      apple: '/favicon.avif',
    },
    title: {
      default: isEnglish
        ? 'Lodenn Studio - Independent Video Game Studio from Brittany'
        : 'Lodenn Studio - Studio de Jeux Vidéo Indépendant Breton',
      template: '%s | Lodenn Studio'
    },
    description: isEnglish
      ? 'Independent video game studio based in Brittany, France. Creators of Aetheris, a stylized survival and exploration game set in a world of floating islands.'
      : 'Studio de jeux vidéo indépendant basé en Bretagne. Créateurs d\'Aetheris, un jeu de survie et d\'exploration stylisé dans un monde d\'îles flottantes.',
    keywords: isEnglish
      ? ['video game studio', 'indie game', 'Aetheris', 'survival game', 'Brittany', 'exploration game', 'floating islands', 'airship', 'crafting']
      : ['studio jeux vidéo', 'indie game', 'Aetheris', 'jeu de survie', 'Bretagne', 'jeu exploration', 'îles flottantes', 'dirigeable', 'crafting'],
    authors: [{ name: 'Lodenn Studio' }],
    creator: 'Lodenn Studio',
    publisher: 'Lodenn Studio',
    metadataBase: new URL('https://lodennstudio.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
    openGraph: {
      title: isEnglish
        ? 'Lodenn Studio - Independent Video Game Studio'
        : 'Lodenn Studio - Studio de Jeux Vidéo Indépendant',
      description: isEnglish
        ? 'Breton indie studio creating immersive video games. Discover Aetheris, our survival game in a world of floating islands.'
        : 'Studio indie breton créant des jeux vidéo immersifs. Découvrez Aetheris, notre jeu de survie dans un monde d\'îles flottantes.',
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      alternateLocale: locale === 'en' ? 'fr_FR' : 'en_US',
      url: `https://lodennstudio.com/${locale}`,
      siteName: 'Lodenn Studio',
      images: [
        {
          url: '/images/logo.avif',
          width: 300,
          height: 300,
          alt: 'Lodenn Studio Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish
        ? 'Lodenn Studio - Breton Indie Studio'
        : 'Lodenn Studio - Studio Indie Breton',
      description: isEnglish
        ? 'Creators of Aetheris, a survival and exploration game in a world of floating islands.'
        : 'Créateurs d\'Aetheris, un jeu de survie et d\'exploration dans un monde d\'îles flottantes.',
      creator: '@lodennstudio',
      images: ['/images/logo.avif'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preload" href="/images/logo.avif" as="image" type="image/avif" />
        <OrganizationSchema locale={locale} />
        <WebSiteSchema locale={locale} />
      </head>
      <body className={inter.className}>
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <PageTransitionHandler />
            <Header />
            <PageTransition>
              <main className="min-h-screen">
                {children}
              </main>
            </PageTransition>
            <Footer />
            <CookieBanner />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
