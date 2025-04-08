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

// Contact form email
export const sendContactFormEmail = async (
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<boolean> => {
  const subject = 'New Contact Form Submission';
  
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
      <div style="background-color: #336699; color: white; padding: 20px; text-align: center;">
        <div style="font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
          Best Sri Lanka Tours - Contact Form
        </div>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <h2 style="color: #336699; margin-top: 0;">New Contact Form Submission</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee; width: 30%;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${phone || 'Not provided'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #336699;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #dddddd;">
        &copy; ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.
      </div>
    </div>
  `;

  const emailOptions: EmailOptions = {
    to: 'info@bestsrilankatours.com', // Your business email
    subject,
    html: emailHtml,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      
      Message:
      ${message}
    `
  };

  // Also send a confirmation email to the user
  const userConfirmationOptions: EmailOptions = {
    to: email,
    subject: 'Thank you for contacting Best Sri Lanka Tours',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
        <div style="background-color: #336699; color: white; padding: 20px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            Best Sri Lanka Tours
          </div>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #336699; margin-top: 0;">Thank You for Contacting Us</h2>
          
          <p style="color: #333333; line-height: 1.5;">
            Dear ${name},
          </p>
          
          <p style="color: #333333; line-height: 1.5;">
            Thank you for reaching out to Best Sri Lanka Tours. We have received your message and will get back to you as soon as possible.
          </p>
          
          <p style="color: #333333; line-height: 1.5;">
            If your inquiry is urgent, please don't hesitate to call us directly at +94 77 123 4567.
          </p>
          
          <p style="color: #333333; line-height: 1.5; margin-top: 25px;">
            Best regards,<br>
            <strong>Best Sri Lanka Tours Team</strong>
          </p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #dddddd;">
          &copy; ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.<br>
          <em>This email was sent because you contacted Best Sri Lanka Tours.</em>
        </div>
      </div>
    `,
    text: `
      Thank You for Contacting Us
      
      Dear ${name},
      
      Thank you for reaching out to Best Sri Lanka Tours. We have received your message and will get back to you as soon as possible.
      
      If your inquiry is urgent, please don't hesitate to call us directly at +94 77 123 4567.
      
      Best regards,
      Best Sri Lanka Tours Team
    `
  };

  // Send both emails
  await sendEmail(emailOptions);
  return sendEmail(userConfirmationOptions);
};

// Tour inquiry email
export const sendTourInquiryEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  travelDates: string,
  packageInterest: string,
  message: string,
  subscribed: boolean
): Promise<boolean> => {
  const subject = `New Tour Inquiry: ${packageInterest || 'General Inquiry'}`;
  
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
      <div style="background-color: #336699; color: white; padding: 20px; text-align: center;">
        <div style="font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
          Best Sri Lanka Tours - Tour Inquiry
        </div>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <h2 style="color: #336699; margin-top: 0;">New Tour Inquiry</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee; width: 30%;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Travel Dates:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${travelDates || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Tour Interest:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${packageInterest || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Newsletter:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${subscribed ? 'Subscribed' : 'Not subscribed'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #336699;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #dddddd;">
        &copy; ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.
      </div>
    </div>
  `;

  const emailOptions: EmailOptions = {
    to: 'info@bestsrilankatours.com', // Your business email
    subject,
    html: emailHtml,
    text: `
      New Tour Inquiry
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Travel Dates: ${travelDates || 'Not specified'}
      Tour Interest: ${packageInterest || 'Not specified'}
      Subscribed to newsletter: ${subscribed ? 'Yes' : 'No'}
      
      Message:
      ${message}
    `
  };

  // Also send a confirmation email to the user
  const userConfirmationOptions: EmailOptions = {
    to: email,
    subject: 'Thank you for your inquiry with Best Sri Lanka Tours',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
        <div style="background-color: #336699; color: white; padding: 20px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            Best Sri Lanka Tours
          </div>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #336699; margin-top: 0;">Thank You for Your Tour Inquiry</h2>
          
          <p style="color: #333333; line-height: 1.5;">
            Dear ${firstName},
          </p>
          
          <p style="color: #333333; line-height: 1.5;">
            Thank you for your interest in our ${packageInterest || 'tours'}. We have received your inquiry and our travel specialist will contact you within 24 hours to discuss your travel plans in detail.
          </p>
          
          ${packageInterest ? `
          <p style="color: #333333; line-height: 1.5;">
            We're excited to help you plan your ${packageInterest} experience in Sri Lanka and will provide you with all the information you need to make your trip unforgettable.
          </p>
          ` : ''}
          
          <p style="color: #333333; line-height: 1.5;">
            If you have any immediate questions, please don't hesitate to call us directly at +94 77 123 4567.
          </p>
          
          <p style="color: #333333; line-height: 1.5; margin-top: 25px;">
            Best regards,<br>
            <strong>Best Sri Lanka Tours Team</strong>
          </p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #dddddd;">
          &copy; ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.<br>
          <em>This email was sent because you submitted an inquiry with Best Sri Lanka Tours.</em>
        </div>
      </div>
    `,
    text: `
      Thank You for Your Tour Inquiry
      
      Dear ${firstName},
      
      Thank you for your interest in our ${packageInterest || 'tours'}. We have received your inquiry and our travel specialist will contact you within 24 hours to discuss your travel plans in detail.
      
      ${packageInterest ? `We're excited to help you plan your ${packageInterest} experience in Sri Lanka and will provide you with all the information you need to make your trip unforgettable.` : ''}
      
      If you have any immediate questions, please don't hesitate to call us directly at +94 77 123 4567.
      
      Best regards,
      Best Sri Lanka Tours Team
    `
  };

  // Send both emails
  await sendEmail(emailOptions);
  return sendEmail(userConfirmationOptions);
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
      <!-- Header with logo-like styling -->
      <div style="background-color: #336699; color: white; padding: 20px; text-align: center;">
        <div style="font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
          Best Sri Lanka Tours
        </div>
      </div>
      
      <!-- Content area -->
      <div style="padding: 30px; background-color: #ffffff;">
        <h2 style="color: #336699; margin-top: 0;">Your Requested Tour Information</h2>
        
        <p style="color: #333333; line-height: 1.5;">
          Thank you for your interest in our <strong style="color: #902923;">${tourName}</strong> tour.
        </p>
        
        <p style="color: #333333; line-height: 1.5;">
          Please find attached the detailed information about this luxury tour. We've included the itinerary, 
          inclusions, exclusions, and other important details in the PDF attachment.
        </p>
        
        <div style="margin: 25px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #90be6d; border-radius: 3px;">
          <p style="color: #333333; margin: 0 0 10px 0; font-weight: bold;">Ready to experience the beauty of Sri Lanka?</p>
          <p style="color: #333333; margin: 0; line-height: 1.5;">
            If you have any questions or would like to book this tour, please reply to this email 
            or contact us through any of the options below:
          </p>
        </div>
        
        <!-- Contact info in a styled box -->
        <table style="width: 100%; background-color: #f5f5f5; border-radius: 5px; margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 15px; border-bottom: 1px solid #eeeeee;">
              <strong style="color: #336699;">Phone:</strong> <span style="color: #333333;">+94 77 123 4567</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px; border-bottom: 1px solid #eeeeee;">
              <strong style="color: #336699;">Email:</strong> <span style="color: #333333;">info@bestsrilankatours.com</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px;">
              <strong style="color: #336699;">Website:</strong> <a href="https://www.bestsrilankatours.com" style="color: #336699; text-decoration: none;">www.bestsrilankatours.com</a>
            </td>
          </tr>
        </table>
        
        <p style="color: #333333; line-height: 1.5;">
          We look forward to helping you plan your perfect Sri Lanka experience.
        </p>
        
        <p style="color: #333333; line-height: 1.5; margin-top: 25px;">
          Best regards,<br>
          <strong>Best Sri Lanka Tours Team</strong>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #dddddd;">
        &copy; ${new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.<br>
        <em>This email was sent because you requested information from Best Sri Lanka Tours.</em>
      </div>
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