'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });

  return (
    <div className="relative bg-black">
      {/* Hero Section avec parallaxe */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/aetheris/illu-2.webp"
            alt="Lodenn Studio"
            fill
            className="object-cover"
            priority
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
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 text-white"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-3xl max-w-3xl mx-auto font-light"
          >
            {t('hero.subtitle')}
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

      {/* Notre Histoire - Layout moderne */}
      <section ref={storyRef} className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/aetheris/illu-1.webp"
                alt="Notre studio"
                fill
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <p className="text-primary font-bold text-base sm:text-xl">{t('story.founded')}</p>
                <p className="text-white text-xl sm:text-3xl font-bold">{t('story.location')}</p>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 order-2 lg:order-none"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 text-center lg:text-left">
                {t('story.title')}
              </h2>
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                <span className="text-primary font-bold">Lodenn Studio</span> {t('story.paragraph1')}
              </p>
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                {t('story.paragraph2')} <span className="text-primary font-bold">Aetheris</span>{t('story.paragraph2b')}
              </p>
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                {t('story.paragraph3')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* L'équipe - Cards gaming style */}
      {/* SECTION TEMPORAIREMENT COMMENTÉE - En attente des photos de l'équipe
      <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">{t('team.title')}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('team.subtitle')} <span className="text-primary font-bold">Aetheris</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: t('team.member1.name'),
                role: t('team.member1.role'),
                image: '/images/Team/Mathew.webp'
              },
              {
                name: t('team.member2.name'),
                role: t('team.member2.role'),
                image: '/images/Team/Mathew.webp'
              },
              {
                name: t('team.member3.name'),
                role: t('team.member3.role'),
                image: '/images/Team/Mathew.webp'
              },
              {
                name: t('team.member4.name'),
                role: t('team.member4.role'),
                image: '/images/Team/Mathew.webp'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-200"
              >
                <div className="relative h-72 bg-gray-800 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    {member.role}
                  </p>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl text-gray-400 mb-8">
              {t('team.hiring')}
            </p>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.5 }}
              style={{ display: "inline-block" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold text-xl rounded-xl transition-all duration-300 shadow-2xl shadow-primary/50"
              >
                {t('team.contactUs')}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      */}

      <CTASection />
    </div>
  );
}
