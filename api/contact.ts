import type { IncomingMessage, ServerResponse } from 'http';
import { sendContactEmails, ContactFormData } from './_mailer';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const body: ContactFormData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!body.name || !body.email || !body.message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, and message are required.' 
      });
    }

    const ticketId = body.ticketId || `EPL-${Math.floor(100000 + Math.random() * 900000)}`;
    const contactData: ContactFormData = {
      ...body,
      ticketId
    };

    const results = await sendContactEmails(contactData);

    return res.status(200).json({
      success: true,
      ticketId,
      message: 'Inquiry sent successfully via Zoho Mail. Confirmation email dispatched.',
      messageId: results.customerResult.messageId
    });
  } catch (error: any) {
    console.error('Contact Form Zoho SMTP Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email via Zoho SMTP server.'
    });
  }
}
