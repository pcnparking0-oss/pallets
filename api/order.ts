import { sendOrderEmails, OrderEmailData } from './_mailer';

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
    const order: OrderEmailData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!order.customer || !order.customer.email || !order.items || order.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required order fields: customer email and cart items are required.' 
      });
    }

    const results = await sendOrderEmails(order);

    return res.status(200).json({
      success: true,
      orderNumber: order.orderNumber,
      message: 'Order confirmation email and proforma invoice dispatched successfully via Zoho Mail.',
      customerMessageId: results.customerResult.messageId,
      adminMessageId: results.adminResult.messageId
    });
  } catch (error: any) {
    console.error('Order Zoho SMTP Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to dispatch order emails via Zoho SMTP.'
    });
  }
}
