import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface ContactConfirmationEmailProps {
  name: string;
  locale: string;
}

// Couleurs de la marque Lodenn Studio
const colors = {
  primary: '#FF6B1A',
  primaryLight: '#f7945e',
  sky: '#5BA4D4',
  nature: '#7BC74D',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    600: '#4B5563',
    700: '#374151',
    900: '#111827',
  }
};

export function ContactConfirmationEmail({
  name,
  locale = 'fr',
}: ContactConfirmationEmailProps) {
  const isFrench = locale === 'fr';

  const content = {
    fr: {
      preview: `Merci ${name} ! Votre message a bien été reçu`,
      title: `Merci ${name} !`,
      subtitle: 'Votre message a bien été reçu',
      greeting: `Bonjour ${name},`,
      paragraph1: 'Nous avons bien reçu votre message et nous vous en remercions.',
      paragraph2: 'Notre équipe vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures.',
      paragraph3: 'Si votre demande est urgente, n\'hésitez pas à nous relancer.',
      signature: 'À très bientôt,',
      team: 'L\'équipe Lodenn Studio',
      footer: 'Studio de jeux vidéo indépendant basé en Bretagne',
      footerSub: 'Cet email de confirmation a été envoyé automatiquement',
    },
    en: {
      preview: `Thank you ${name}! Your message has been received`,
      title: `Thank you ${name}!`,
      subtitle: 'Your message has been received',
      greeting: `Hello ${name},`,
      paragraph1: 'We have received your message and thank you for reaching out.',
      paragraph2: 'Our team will respond as soon as possible, usually within 24 to 48 hours.',
      paragraph3: 'If your request is urgent, please feel free to follow up with us.',
      signature: 'Talk soon,',
      team: 'The Lodenn Studio Team',
      footer: 'Independent video game studio based in Brittany, France',
      footerSub: 'This confirmation email was sent automatically',
    },
  };

  const t = isFrench ? content.fr : content.en;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header avec logo */}
          <Section style={styles.header}>
            <Img
              src="https://lodennstudio.com/images/Mail/logo.png"
              width="150"
              height="150"
              alt="Lodenn Studio Logo"
              style={styles.logo}
            />
            <Heading style={styles.headerTitle}>
              {t.title}
            </Heading>
            <Text style={styles.headerSubtitle}>
              {t.subtitle}
            </Text>
          </Section>

          {/* Contenu principal */}
          <Section style={styles.contentSection}>
            <Text style={styles.greeting}>{t.greeting}</Text>

            <Text style={styles.paragraph}>
              {t.paragraph1}
            </Text>

            <div style={styles.highlightBox}>
              <Text style={styles.highlightText}>
                ⏱️ {t.paragraph2}
              </Text>
            </div>

            <Text style={styles.paragraph}>
              {t.paragraph3}
            </Text>

            <Hr style={styles.divider} />

            <Text style={styles.signature}>
              {t.signature}
              <br />
              <strong>{t.team}</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              <strong>Lodenn Studio</strong>
            </Text>
            <Text style={styles.footerSubtext}>
              {t.footer}
            </Text>
            <Text style={styles.footerSubtext}>
              {t.footerSub}
            </Text>
            <div style={styles.socialLinks}>
              <Link href="https://lodennstudio.com" style={styles.link}>
                🌐 lodennstudio.com
              </Link>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: colors.gray[100],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '20px 0',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    maxWidth: '600px',
    margin: '0 auto',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    background: `linear-gradient(to bottom, ${colors.primaryLight} 0%, ${colors.white} 100%)`,
    padding: '40px 20px',
    textAlign: 'center' as const,
  },
  logo: {
    display: 'block',
    margin: '0 auto 20px',
    borderRadius: '12px',
  },
  headerTitle: {
    color: colors.gray[900],
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    lineHeight: '1.3',
  },
  headerSubtitle: {
    color: colors.gray[700],
    fontSize: '15px',
    margin: '0',
    fontWeight: '400',
  },
  contentSection: {
    padding: '40px 30px',
  },
  greeting: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.gray[900],
    margin: '0 0 20px 0',
  },
  paragraph: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: colors.gray[700],
    margin: '0 0 16px 0',
  },
  highlightBox: {
    backgroundColor: colors.gray[50],
    border: `2px solid ${colors.primary}`,
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
  },
  highlightText: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: colors.gray[900],
    margin: '0',
    fontWeight: '500',
  },
  divider: {
    borderColor: colors.gray[200],
    margin: '30px 0',
  },
  signature: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: colors.gray[700],
    margin: '0',
  },
  footer: {
    backgroundColor: colors.gray[50],
    padding: '24px 30px',
    textAlign: 'center' as const,
    borderTop: `1px solid ${colors.gray[200]}`,
  },
  footerText: {
    fontSize: '14px',
    color: colors.gray[700],
    margin: '0 0 8px 0',
  },
  footerSubtext: {
    fontSize: '12px',
    color: colors.gray[600],
    margin: '0 0 8px 0',
  },
  socialLinks: {
    marginTop: '16px',
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
};
