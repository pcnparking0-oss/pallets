import nodemailer from 'nodemailer';

export interface MailerConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

export function getMailerConfig(): MailerConfig {
  return {
    host: process.env.SMTP_HOST || 'smtppro.zoho.com',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    user: process.env.SMTP_USER || 'info@europalletsupply.com',
    pass: process.env.SMTP_PASS || 'mimowhite',
    from: process.env.EMAIL_FROM || '"Europallet Supply" <info@europalletsupply.com>'
  };
}

export function createTransporter() {
  const config = getMailerConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // true for 465, false for other ports
    auth: {
      user: config.user,
      pass: config.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

// -------------------------------------------------------------
// 1. CONTACT FORM EMAILS
// -------------------------------------------------------------
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  orderNumber?: string;
  subject?: string;
  message: string;
  ticketId: string;
}

export async function sendContactEmails(data: ContactFormData) {
  const transporter = createTransporter();
  const config = getMailerConfig();

  const formattedDate = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' });

  // 1. Admin Notification to info@europalletsupply.com
  const adminMailOptions = {
    from: config.from,
    to: config.user,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `[New Inquiry #${data.ticketId}] ${data.subject || data.inquiryType || 'Customer Message'} - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
          .header { background: #022c22; padding: 24px; border-bottom: 2px solid #10b981; }
          .title { color: #10b981; font-size: 20px; font-weight: bold; margin: 0; }
          .subtitle { color: #94a3b8; font-size: 13px; margin-top: 4px; }
          .content { padding: 24px; }
          .badge { display: inline-block; background: #064e3b; color: #34d399; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 6px; font-family: monospace; }
          .field-group { margin-bottom: 16px; }
          .field-label { color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
          .field-value { color: #f8fafc; font-size: 14px; margin-top: 2px; }
          .message-box { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
          .footer { background: #0f172a; padding: 16px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">TICKET: ${data.ticketId}</div>
            <h1 class="title" style="margin-top: 8px;">New Customer Desk Inquiry</h1>
            <div class="subtitle">Received on ${formattedDate} (CET)</div>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="field-label">Sender Details</div>
              <div class="field-value"><strong>${data.name}</strong> &lt;<a href="mailto:${data.email}" style="color: #34d399;">${data.email}</a>&gt;</div>
              ${data.phone ? `<div class="field-value" style="color: #94a3b8; font-size: 13px;">Phone: ${data.phone}</div>` : ''}
            </div>

            <div class="field-group">
              <div class="field-label">Inquiry Category</div>
              <div class="field-value"><span style="color: #38bdf8; font-weight: 600;">${data.inquiryType || 'General Inquiries'}</span></div>
            </div>

            ${data.orderNumber ? `
            <div class="field-group">
              <div class="field-label">Referenced Order Number</div>
              <div class="field-value" style="font-family: monospace; color: #f59e0b;">${data.orderNumber}</div>
            </div>` : ''}

            ${data.subject ? `
            <div class="field-group">
              <div class="field-label">Subject</div>
              <div class="field-value"><strong>${data.subject}</strong></div>
            </div>` : ''}

            <div class="field-group">
              <div class="field-label">Message Content</div>
              <div class="message-box">${data.message}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155; font-size: 13px; color: #94a3b8;">
              Click <a href="mailto:${data.email}?subject=Re: [Ticket ${data.ticketId}] ${encodeURIComponent(data.subject || 'EuroPalletSupply Inquiry')}" style="color: #10b981; font-weight: bold;">Reply to ${data.name}</a> to respond directly.
            </div>
          </div>
          <div class="footer">
            EuroPalletSupply B.V. • Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands<br>
            KvK: 89234190 • VAT: NL864192084B01 • <a href="https://europalletsupply.com" style="color: #10b981;">europalletsupply.com</a>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // 2. Auto-responder to Customer
  const customerMailOptions = {
    from: config.from,
    to: data.email,
    subject: `[Ticket #${data.ticketId}] We received your inquiry - EuroPalletSupply`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
          .header { background: #022c22; padding: 24px; border-bottom: 2px solid #10b981; text-align: center; }
          .logo { font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }
          .logo span { color: #10b981; }
          .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
          .ticket-card { background: #0f172a; border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center; }
          .ticket-id { font-family: monospace; font-size: 20px; font-weight: bold; color: #34d399; }
          .footer { background: #0f172a; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; text-align: center; }
          .button { display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 10px 24px; border-radius: 8px; text-decoration: none; margin-top: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">EuroPallet<span>Supply</span></div>
            <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">European Wholesale & Liquidation Logistics Hub</div>
          </div>
          <div class="content">
            <p>Hello <strong>${data.name}</strong>,</p>
            <p>Thank you for reaching out to EuroPalletSupply. We have received your inquiry and our customer support & wholesale dispatch team in Venlo is reviewing it.</p>
            
            <div class="ticket-card">
              <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase;">Your Support Reference Ticket</div>
              <div class="ticket-id">${data.ticketId}</div>
              <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Typical response time: within 2 to 4 business hours</div>
            </div>

            <p><strong>Summary of your submission:</strong></p>
            <ul style="padding-left: 20px; color: #94a3b8;">
              <li><strong>Inquiry Type:</strong> ${data.inquiryType || 'General'}</li>
              ${data.orderNumber ? `<li><strong>Order Number:</strong> ${data.orderNumber}</li>` : ''}
              ${data.subject ? `<li><strong>Subject:</strong> ${data.subject}</li>` : ''}
            </ul>

            <div style="background: #0f172a; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #10b981; font-style: italic; color: #e2e8f0;">
              "${data.message.length > 200 ? data.message.slice(0, 200) + '...' : data.message}"
            </div>

            <p style="margin-top: 20px;">If you have any additional details or files to add, you can reply directly to this email.</p>

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://europalletsupply.com/shop" class="button">Browse Current Liquidation Lots</a>
            </div>
          </div>
          <div class="footer">
            EuroPalletSupply B.V. • Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands<br>
            Direct Help Desk: <a href="mailto:info@europalletsupply.com" style="color: #10b981;">info@europalletsupply.com</a> • +31 (0)77 820 0419
          </div>
        </div>
      </body>
      </html>
    `
  };

  const [adminResult, customerResult] = await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(customerMailOptions)
  ]);

  return { adminResult, customerResult };
}

// -------------------------------------------------------------
// 2. ORDER FORM / CHECKOUT CONFIRMATION EMAILS
// -------------------------------------------------------------
export interface OrderItemData {
  title: string;
  sku?: string;
  price: number;
  quantity: number;
  image?: string;
  condition?: string;
}

export interface OrderEmailData {
  orderNumber: string;
  trackingNumber?: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItemData[];
  subtotalEur: number;
  discountEur?: number;
  couponCode?: string;
  shippingEur: number;
  shippingCarrier?: string;
  vatEur: number;
  totalEur: number;
  paymentMethod: string;
}

export async function sendOrderEmails(order: OrderEmailData) {
  const transporter = createTransporter();
  const config = getMailerConfig();

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const itemsHtml = order.items.map(item => `
    <tr style="border-bottom: 1px solid #334155;">
      <td style="padding: 12px 8px; vertical-align: middle;">
        <div style="font-weight: bold; color: #f8fafc;">${item.title}</div>
        <div style="font-size: 11px; color: #94a3b8; font-family: monospace;">SKU: ${item.sku || 'EPL-LOT'} ${item.condition ? `• ${item.condition}` : ''}</div>
      </td>
      <td style="padding: 12px 8px; text-align: center; color: #cbd5e1; font-weight: 600;">${item.quantity}x</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: #34d399; font-family: monospace;">€${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const paymentMethodLabel = {
    bank_transfer: 'SEPA Bank Transfer (Instant / Priority)',
    card: 'Credit / Debit Card (Verified)',
    crypto: 'USDT (Tether TRC20/ERC20)',
    wire_transfer: 'International Wire Transfer',
    bunq: 'Bunq Direct Bank Transfer',
    usdt: 'USDT Crypto Payment'
  }[order.paymentMethod] || order.paymentMethod;

  // 1. Customer Order Confirmation & Proforma Invoice
  const customerMailOptions = {
    from: config.from,
    to: order.customer.email,
    subject: `[Order Confirmed #${order.orderNumber}] Your EuroPalletSupply Invoice & Logistics Details`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
          .container { max-width: 620px; margin: 0 auto; background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
          .header { background: #022c22; padding: 28px 24px; border-bottom: 2px solid #10b981; }
          .logo { font-size: 24px; font-weight: 900; color: #ffffff; }
          .logo span { color: #10b981; }
          .content { padding: 24px; font-size: 14px; color: #cbd5e1; }
          .status-banner { background: #064e3b; border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
          .totals-table { width: 100%; margin-top: 16px; font-size: 13px; }
          .totals-table td { padding: 6px 8px; }
          .footer { background: #0f172a; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; text-align: center; }
          .badge { display: inline-block; background: #10b981; color: #022c22; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div class="logo">EuroPallet<span>Supply</span></div>
              <div class="badge">Official Order Manifest</div>
            </div>
            <div style="color: #94a3b8; font-size: 13px; margin-top: 6px;">
              Venlo Logistics Hub • Proforma Invoice & Dispatch Guarantee
            </div>
          </div>

          <div class="content">
            <div class="status-banner">
              <div style="font-size: 16px; font-weight: bold; color: #34d399;">✓ Order Received & Reserved in Warehouse</div>
              <div style="font-size: 13px; color: #a7f3d0; margin-top: 4px;">
                Order Number: <strong style="font-family: monospace; color: #ffffff;">${order.orderNumber}</strong> • Date: ${formattedDate}
              </div>
            </div>

            <p>Dear <strong>${order.customer.fullName}</strong>,</p>
            <p>Thank you for purchasing with <strong>EuroPalletSupply</strong>. Your liquidation lot(s) have been reserved and routed to our Venlo packing terminal.</p>

            ${order.trackingNumber ? `
            <div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 14px; margin: 16px 0;">
              <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 600;">Carrier & Freight Consignment</div>
              <div style="font-size: 16px; font-weight: bold; color: #38bdf8; font-family: monospace; margin-top: 2px;">
                ${order.shippingCarrier || 'DHL Express EU Freight'}: ${order.trackingNumber}
              </div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Tracking updates activate once strapped and scanned at the loading bay.</div>
            </div>` : ''}

            <h3 style="color: #f8fafc; font-size: 15px; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid #334155; padding-bottom: 6px;">
              Manifested Items (${order.items.length})
            </h3>
            
            <table class="table">
              <thead>
                <tr style="border-bottom: 2px solid #334155; color: #94a3b8; text-align: left; font-size: 11px; text-transform: uppercase;">
                  <th style="padding: 8px;">Product Lot Description</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Total (EUR)</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Totals breakdown -->
            <table class="totals-table">
              <tr>
                <td style="color: #94a3b8;">Subtotal</td>
                <td style="text-align: right; color: #f8fafc; font-family: monospace;">€${order.subtotalEur.toFixed(2)}</td>
              </tr>
              ${order.discountEur && order.discountEur > 0 ? `
              <tr>
                <td style="color: #34d399;">Coupon Discount (${order.couponCode || 'PROMO'})</td>
                <td style="text-align: right; color: #34d399; font-family: monospace;">-€${order.discountEur.toFixed(2)}</td>
              </tr>` : ''}
              <tr>
                <td style="color: #94a3b8;">Freight Delivery (${order.shippingCarrier || 'Tracked EU Delivery'})</td>
                <td style="text-align: right; color: #f8fafc; font-family: monospace;">${order.shippingEur === 0 ? 'FREE' : '€' + order.shippingEur.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="color: #64748b; font-size: 11px;">Included 21% Dutch VAT</td>
                <td style="text-align: right; color: #64748b; font-size: 11px; font-family: monospace;">€${order.vatEur.toFixed(2)}</td>
              </tr>
              <tr style="border-top: 2px solid #334155; font-size: 16px; font-weight: bold;">
                <td style="color: #ffffff; padding-top: 10px;">Total Paid / Due</td>
                <td style="text-align: right; color: #34d399; font-family: monospace; padding-top: 10px;">€${order.totalEur.toFixed(2)}</td>
              </tr>
            </table>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; padding: 16px; background: #0f172a; border-radius: 8px; border: 1px solid #334155;">
              <div>
                <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 600;">Delivery Destination</div>
                <div style="font-size: 13px; color: #f8fafc; margin-top: 4px;">
                  <strong>${order.customer.fullName}</strong><br>
                  ${order.customer.street} ${order.customer.apartment || ''}<br>
                  ${order.customer.postalCode} ${order.customer.city}<br>
                  ${order.customer.country}<br>
                  <span style="color: #94a3b8;">Phone: ${order.customer.phone}</span>
                </div>
              </div>
              <div>
                <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 600;">Payment Selected</div>
                <div style="font-size: 13px; color: #f8fafc; margin-top: 4px;">
                  <strong>${paymentMethodLabel}</strong><br>
                  <span style="color: #10b981; font-size: 12px;">Payment Status: Confirmed / Pending Verification</span>
                </div>
              </div>
            </div>

            <p style="font-size: 12px; color: #94a3b8; margin-top: 20px; line-height: 1.5;">
              🛡️ <strong>30-Day Money-Back Guarantee:</strong> Covered by EU Consumer Directives and EuroPalletSupply Manifest Accuracy Warranty. If you have any inquiries, reply to this email or contact <a href="mailto:info@europalletsupply.com" style="color: #10b981;">info@europalletsupply.com</a>.
            </p>
          </div>

          <div class="footer">
            EuroPalletSupply B.V. • Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands<br>
            KvK: 89234190 • VAT: NL864192084B01 • <a href="https://europalletsupply.com" style="color: #10b981;">europalletsupply.com</a>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // 2. Admin Alert to info@europalletsupply.com
  const adminMailOptions = {
    from: config.from,
    to: config.user,
    subject: `🚨 [NEW ORDER #${order.orderNumber}] €${order.totalEur.toFixed(2)} - ${order.customer.fullName} (${order.customer.country})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
          .header { background: #022c22; padding: 20px; border-bottom: 2px solid #10b981; }
          .content { padding: 20px; }
          .badge { background: #10b981; color: #022c22; font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .box { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 14px; margin-bottom: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">NEW ORDER ALERT</span>
            <h2 style="color: #ffffff; margin: 8px 0 0 0;">Order #${order.orderNumber}</h2>
            <div style="color: #34d399; font-size: 18px; font-weight: bold; margin-top: 4px;">Total: €${order.totalEur.toFixed(2)}</div>
          </div>
          <div class="content">
            <div class="box">
              <strong style="color: #38bdf8;">Customer Details:</strong><br>
              Name: <strong>${order.customer.fullName}</strong><br>
              Email: <a href="mailto:${order.customer.email}" style="color: #34d399;">${order.customer.email}</a><br>
              Phone: ${order.customer.phone}<br>
              Address: ${order.customer.street} ${order.customer.apartment || ''}, ${order.customer.postalCode} ${order.customer.city}, ${order.customer.country}
            </div>

            <div class="box">
              <strong style="color: #f59e0b;">Order Summary:</strong><br>
              Payment: <strong>${paymentMethodLabel}</strong><br>
              Items Count: ${order.items.length}<br>
              Tracking: ${order.trackingNumber || 'Pending'}
            </div>

            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
              ${order.items.map(i => `
                <tr style="border-bottom: 1px solid #334155;">
                  <td style="padding: 6px 0;">${i.quantity}x ${i.title}</td>
                  <td style="padding: 6px 0; text-align: right; color: #34d399; font-family: monospace;">€${(i.price * i.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        </div>
      </body>
      </html>
    `
  };

  const [customerResult, adminResult] = await Promise.all([
    transporter.sendMail(customerMailOptions),
    transporter.sendMail(adminMailOptions)
  ]);

  return { customerResult, adminResult };
}

// -------------------------------------------------------------
// 3. NEWSLETTER / SUBSCRIPTION EMAILS
// -------------------------------------------------------------
export async function sendSubscriptionEmails(subscriberEmail: string, discountCode: string = 'EURO10') {
  const transporter = createTransporter();
  const config = getMailerConfig();

  // 1. Welcome & 10% Discount Code Email to Subscriber
  const subscriberMailOptions = {
    from: config.from,
    to: subscriberEmail,
    subject: `Welcome to EuroPalletSupply! Your 10% Discount Code: ${discountCode}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
          .header { background: #022c22; padding: 24px; border-bottom: 2px solid #10b981; text-align: center; }
          .logo { font-size: 22px; font-weight: 900; color: #ffffff; }
          .logo span { color: #10b981; }
          .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
          .code-box { background: #0f172a; border: 2px dashed #10b981; border-radius: 8px; padding: 18px; margin: 20px 0; text-align: center; }
          .code { font-family: monospace; font-size: 24px; font-weight: 900; color: #34d399; letter-spacing: 2px; }
          .button { display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-top: 14px; }
          .footer { background: #0f172a; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">EuroPallet<span>Supply</span></div>
            <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Exclusive Wholesale Liquidation Alerts</div>
          </div>
          <div class="content">
            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Welcome to Priority Manifest Alerts!</h2>
            <p>You have successfully subscribed to the EuroPalletSupply newsletter. You will now receive early notifications whenever fresh overstock pallets, Amazon return lots, and electronics clearance shipments arrive at our Venlo logistics hub.</p>

            <div class="code-box">
              <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">Your Exclusive 10% Voucher Code</div>
              <div class="code">${discountCode}</div>
              <div style="font-size: 12px; color: #a7f3d0; margin-top: 6px;">Valid on all liquidation pallets and single retail clearance orders</div>
            </div>

            <p><strong>How to use your code:</strong></p>
            <ol style="padding-left: 20px; color: #94a3b8;">
              <li>Browse our live liquidation inventory catalog.</li>
              <li>Add your chosen pallets or consumer electronics lots to your cart.</li>
              <li>Enter promo code <strong style="color: #34d399; font-family: monospace;">${discountCode}</strong> at checkout to apply 10% savings immediately.</li>
            </ol>

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://europalletsupply.com/shop" class="button">Browse Current Pallet Lots</a>
            </div>
          </div>
          <div class="footer">
            EuroPalletSupply B.V. • Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands<br>
            Support: <a href="mailto:info@europalletsupply.com" style="color: #10b981;">info@europalletsupply.com</a> • Unsubscribe anytime.
          </div>
        </div>
      </body>
      </html>
    `
  };

  // 2. Admin Alert to info@europalletsupply.com
  const adminMailOptions = {
    from: config.from,
    to: config.user,
    subject: `[New Subscriber] ${subscriberEmail} joined wholesale manifest alerts`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 20px;">
        <div style="max-width: 500px; margin: 0 auto; background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
          <h3 style="color: #10b981; margin-top: 0;">New Newsletter Subscriber</h3>
          <p>Email: <strong><a href="mailto:${subscriberEmail}" style="color: #38bdf8;">${subscriberEmail}</a></strong></p>
          <p style="font-size: 12px; color: #94a3b8;">Issued voucher code: ${discountCode}</p>
          <p style="font-size: 12px; color: #64748b;">Timestamp: ${new Date().toISOString()}</p>
        </div>
      </body>
      </html>
    `
  };

  const [subscriberResult, adminResult] = await Promise.all([
    transporter.sendMail(subscriberMailOptions),
    transporter.sendMail(adminMailOptions)
  ]);

  return { subscriberResult, adminResult };
}
