'use client';

import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import CTASection from '@/components/CTASection';
import { VideoGameSchema } from '@/components/StructuredData';
import { useTranslations, useLocale } from 'next-intl';

const galleryImages = [
  {
    src: '/images/aetheris/illu-1.webp',
    alt: 'Aetheris - Explorers on floating island',
  },
  {
    src: '/images/aetheris/illu-2.webp',
    alt: 'Aetheris - Airship and team gathering',
  },
  {
    src: '/images/aetheris/illu-3.webp',
    alt: 'Aetheris - Adventurers exploring mystical islands',
  },
  {
    src: '/images/aetheris/illu-4.webp',
    alt: 'Aetheris - Floating island civilization',
  },
];

export default function AetherisPage() {
  const t = useTranslations('aetheris');
  const locale = useLocale();
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.2 });

  return (
    <div className="relative bg-black">
      <VideoGameSchema locale={locale} />

      {/* Hero Section avec parallaxe */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/aetheris/illu-1.webp"
            alt="Aetheris"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block px-6 py-3 bg-primary text-white rounded-full text-sm font-bold mb-8 shadow-2xl shadow-primary/50">
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
            className="text-7xl sm:text-8xl lg:text-9xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary drop-shadow-2xl">
              Aetheris
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl sm:text-4xl max-w-4xl mx-auto font-light mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Trailer Section - Commented out until trailer is ready */}
      {/*
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold text-white mb-4">{t('hero.trailer')}</h2>
            <p className="text-xl text-gray-400">{t('hero.description')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
          >
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Aetheris Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
          <p className="text-center text-sm text-gray-500 mt-6">
            * Vidéo placeholder - sera remplacée par le vrai trailer d&apos;Aetheris
          </p>
        </div>
      </section>
      */}

      {/* About Section */}
      <section className="relative py-32 bg-gray-900">
        {/* Ligne de séparation orange */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">{t('meta.title')}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-12 border border-white/10 mb-16"
          >
            <p className="text-2xl text-gray-300 leading-relaxed text-center">
              {t('meta.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gameplay Sections - Image/Text alternating */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 space-y-32">

          {/* Section 1 - Survie (Image gauche, texte droite) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Glow orange */}
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-2xl group-hover:bg-primary/50 transition-all duration-300" />

              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/aetheris/illu-3.webp"
                  alt={t('features.survive.title')}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-5xl font-bold text-white">{t('features.survive.title')}</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('features.survive.description')}
              </p>
            </motion.div>
          </div>

          {/* Section 2 - Création (Texte gauche, image droite) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:order-1"
            >
              <h2 className="text-5xl font-bold text-white">{t('features.create.title')}</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('features.create.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:order-2 group"
            >
              {/* Glow orange */}
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-2xl group-hover:bg-primary/50 transition-all duration-300" />

              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/aetheris/illu-4.webp"
                  alt={t('features.create.title')}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </div>

          {/* Section 3 - Exploration (Image gauche, texte droite) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Glow orange */}
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-2xl group-hover:bg-primary/50 transition-all duration-300" />

              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/aetheris/illu-2.webp"
                  alt={t('features.explore.title')}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-5xl font-bold text-white">{t('features.explore.title')}</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('features.explore.description')}
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="relative py-32 bg-black">
        {/* Ligne de séparation orange */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">{t('gallery.title')}</h2>
            <p className="text-xl text-gray-400">{t('gallery.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ImageGallery images={galleryImages} />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
