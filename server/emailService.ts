import sgMail from '@sendgrid/mail';

// Check if SendGrid API key is set
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: {
    content: string;
    filename: string;
    type: string;
    disposition: string;
  }[];
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key is not set. Unable to send email.');
    throw new Error('Email service is not configured');
  }

  try {
    const msg = {
      to: options.to,
      from: 'info@bestsrilankatours.com', // Use your verified sender
      subject: options.subject,
      text: options.text || '',
      html: options.html || '',
      attachments: options.attachments
    };

    const response = await sgMail.send(msg as any);
    console.log('Email sent successfully', response);
    return true;
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    throw error;
  }
};

export const sendTourPdfEmail = async (
  recipientEmail: string,
  tourName: string,
  pdfContent: string
): Promise<boolean> => {
  const subject = `Your Requested Tour Information: ${tourName}`;
  const emailText = `
    Thank you for your interest in our ${tourName} tour.
    
    Please find attached the detailed information about this luxury tour.
    
    If you have any questions or would like to book this tour, please reply to this email or contact us at:
    
    Phone: +94 77 123 4567
    Email: info@bestsrilankatours.com
    
    We look forward to helping you plan your perfect Sri Lanka experience.
    
    Best regards,
    Best Sri Lanka Tours Team
  `;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #336699;">Your Requested Tour Information</h2>
      <p>Thank you for your interest in our <strong>${tourName}</strong> tour.</p>
      
      <p>Please find attached the detailed information about this luxury tour.</p>
      
      <p>If you have any questions or would like to book this tour, please reply to this email or contact us at:</p>
      
      <ul>
        <li>Phone: <strong>+94 77 123 4567</strong></li>
        <li>Email: <strong>info@bestsrilankatours.com</strong></li>
      </ul>
      
      <p>We look forward to helping you plan your perfect Sri Lanka experience.</p>
      
      <p>Best regards,<br>
      <strong>Best Sri Lanka Tours Team</strong></p>
    </div>
  `;

  const emailOptions: EmailOptions = {
    to: recipientEmail,
    subject,
    text: emailText,
    html: emailHtml,
    attachments: [
      {
        content: pdfContent,
        filename: `${tourName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  };

  return sendEmail(emailOptions);
};