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

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const subjectLabels: Record<string, string> = {
  general: '💬 Demande générale',
  aetheris: '🎮 Question sur Aetheris',
  press: '📰 Presse & Médias',
  partnership: '🤝 Partenariat',
  other: '📌 Autre',
};

// Couleurs de la marque Lodenn Studio
const colors = {
  primary: '#FF6B1A',      // Orange principal
  primaryDark: '#E65100',  // Orange foncé
  sky: '#5BA4D4',          // Bleu ciel
  nature: '#7BC74D',       // Vert nature
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    600: '#4B5563',
    700: '#374151',
    900: '#111827',
  }
};

export function ContactFormEmail({
  name,
  email,
  subject,
  message,
  submittedAt,
}: ContactFormEmailProps) {
  const subjectLabel = subjectLabels[subject] || subject;

  return (
    <Html>
      <Head />
      <Preview>📬 Nouveau message de {name} - {subjectLabel}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header avec logo et titre */}
          <Section style={styles.header}>
            <Img
              src="https://i.postimg.cc/SQv05mmS/logo.png"
              width="150"
              height="150"
              alt="Lodenn Studio Logo"
              style={styles.logo}
            />
            <Heading style={styles.headerTitle}>
              Nouveau message de contact
            </Heading>
            <Text style={styles.headerSubtitle}>
              Formulaire de contact - lodennstudio.com
            </Text>
          </Section>

          {/* Badge du sujet */}
          <Section style={styles.subjectBadgeContainer}>
            <div style={styles.subjectBadge}>
              {subjectLabel}
            </div>
          </Section>

          {/* Informations du contact */}
          <Section style={styles.infoSection}>
            <table style={styles.infoTable}>
              <tr>
                <td style={styles.infoLabel}>👤 Nom :</td>
                <td style={styles.infoValue}>{name}</td>
              </tr>
              <tr>
                <td style={styles.infoLabel}>📧 Email :</td>
                <td style={styles.infoValue}>
                  <Link href={`mailto:${email}`} style={styles.emailLink}>
                    {email}
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={styles.infoLabel}>📅 Reçu le :</td>
                <td style={styles.infoValue}>{submittedAt}</td>
              </tr>
            </table>
          </Section>

          <Hr style={styles.divider} />

          {/* Message */}
          <Section style={styles.messageSection}>
            <Text style={styles.messageLabel}>💬 Message :</Text>
            <div style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </div>
          </Section>

          {/* Bouton de réponse */}
          <Section style={styles.buttonSection}>
            <Link
              href={`mailto:${email}?subject=Re: Contact Lodenn Studio - ${subjectLabel}`}
              style={styles.button}
            >
              ↩️ Répondre à {name}
            </Link>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              <strong>Lodenn Studio</strong> - Studio de jeux vidéo indépendant basé en Bretagne
            </Text>
            <Text style={styles.footerSubtext}>
              Cet email a été envoyé automatiquement depuis le formulaire de contact
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles inline pour compatibilité maximale avec les clients email
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
  subjectBadgeContainer: {
    padding: '24px 30px 0',
    textAlign: 'center' as const,
  },
  subjectBadge: {
    display: 'inline-block',
    backgroundColor: colors.sky,
    color: colors.white,
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'center' as const,
  },
  infoSection: {
    padding: '24px 30px',
  },
  infoTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.gray[600],
    paddingBottom: '12px',
    paddingRight: '16px',
    verticalAlign: 'top' as const,
    width: '120px',
  },
  infoValue: {
    fontSize: '15px',
    color: colors.gray[900],
    paddingBottom: '12px',
    wordBreak: 'break-word' as const,
  },
  emailLink: {
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: '500',
  },
  divider: {
    borderColor: colors.gray[200],
    margin: '0 30px',
  },
  messageSection: {
    padding: '24px 30px',
  },
  messageLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.gray[700],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 12px 0',
  },
  messageBox: {
    backgroundColor: colors.gray[50],
    border: `2px solid ${colors.gray[200]}`,
    borderRadius: '8px',
    padding: '20px',
  },
  messageText: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: colors.gray[900],
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
    wordWrap: 'break-word' as const,
  },
  buttonSection: {
    padding: '24px 30px 32px',
    textAlign: 'center' as const,
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    display: 'inline-block',
    boxShadow: `0 4px 12px rgba(255, 107, 26, 0.3)`,
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
    lineHeight: '1.5',
  },
  footerSubtext: {
    fontSize: '12px',
    color: colors.gray[600],
    margin: '0',
    lineHeight: '1.5',
  },
};
