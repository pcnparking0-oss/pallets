import { sendSubscriptionEmails } from './_mailer';

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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const email = body?.email;
    const discountCode = body?.discountCode || 'EURO10';

    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        error: 'A valid email address is required.' 
      });
    }

    const results = await sendSubscriptionEmails(email, discountCode);

    return res.status(200).json({
      success: true,
      email,
      discountCode,
      message: 'Subscription confirmed. 10% voucher code sent to your inbox via Zoho Mail.',
      messageId: results.subscriberResult.messageId
    });
  } catch (error: any) {
    console.error('Subscription Zoho SMTP Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to dispatch subscription email via Zoho SMTP.'
    });
  }
}
