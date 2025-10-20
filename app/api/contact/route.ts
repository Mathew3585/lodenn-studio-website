import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/ContactFormEmail';
import { ContactConfirmationEmail } from '@/components/emails/ContactConfirmationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('🔥 API Route /api/contact called');
  console.log('📧 RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  console.log('📬 CONTACT_EMAIL_TO:', process.env.CONTACT_EMAIL_TO);
  console.log('📮 CONTACT_EMAIL_FROM:', process.env.CONTACT_EMAIL_FROM);

  try {
    // Parse form data
    const body = await request.json();
    console.log('📝 Form data received:', { ...body, message: body.message?.substring(0, 50) + '...' });
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed, preparing to send email...');

    // Map subject values to readable labels
    const subjectLabels: Record<string, string> = {
      general: 'General Inquiry',
      aetheris: 'About Aetheris',
      press: 'Press & Media',
      partnership: 'Partnership',
      other: 'Other',
    };

    const subjectLabel = subjectLabels[subject] || subject;

    console.log('📧 Sending emails via Resend...');

    // Format timestamp
    const submittedAt = new Date().toLocaleString('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    // Get locale from request headers or default to 'fr'
    const locale = request.headers.get('accept-language')?.includes('en') ? 'en' : 'fr';

    // 1. Send email to staff
    const { data: staffData, error: staffError } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL_TO || 'mathew.simon2004@gmail.com',
      subject: `📬 Nouveau contact - ${subjectLabel}`,
      react: ContactFormEmail({
        name,
        email,
        subject,
        message,
        submittedAt,
      }),
    });

    if (staffError) {
      console.error('❌ Staff email error:', staffError);
      return NextResponse.json(
        { error: 'Failed to send email to staff', details: staffError },
        { status: 500 }
      );
    }

    console.log('✅ Staff email sent! Message ID:', staffData?.id);

    // 2. Send confirmation email to user
    const { data: confirmData, error: confirmError } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: locale === 'fr'
        ? '✅ Votre message a bien été reçu - Lodenn Studio'
        : '✅ Your message has been received - Lodenn Studio',
      react: ContactConfirmationEmail({
        name,
        locale,
      }),
    });

    if (confirmError) {
      console.error('❌ Confirmation email error:', confirmError);
      // On continue même si l'email de confirmation échoue
      console.log('⚠️ Staff email sent but confirmation email failed');
    } else {
      console.log('✅ Confirmation email sent! Message ID:', confirmData?.id);
    }

    return NextResponse.json(
      {
        success: true,
        staffMessageId: staffData?.id,
        confirmMessageId: confirmData?.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
