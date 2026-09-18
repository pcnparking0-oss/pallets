import { Currency, ShopOrder } from '../types';

export const EUR_TO_GBP_RATE = 0.86;

export function formatCurrency(amountEur: number, currency: Currency = 'EUR'): string {
  if (currency === 'GBP') {
    const gbpAmount = amountEur * EUR_TO_GBP_RATE;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(gbpAmount);
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amountEur);
}

export function formatCurrencyDetailed(amountEur: number, currency: Currency = 'EUR'): string {
  return formatCurrency(amountEur, currency);
}

export function downloadOrderReceipt(order: ShopOrder): void {
  const content = `=====================================================
EUROPALLET LIQUIDATION & OUTLET STORE
EuroPalletLiquidation B.V.
Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, The Netherlands
Support: support@europalletliquidation.eu
VAT ID: NL864192084B01 | KvK: 89234190
=====================================================
ORDER RECEIPT & CONFIRMATION
Order ID: ${order.id}
Order Number: ${order.orderNumber}
Date: ${order.date}
Tracking Number: ${order.trackingNumber} (${order.carrier})
Estimated Delivery: ${order.estimatedDelivery}

SHIP TO:
${order.customer.fullName}
${order.customer.street}${order.customer.apartment ? ', ' + order.customer.apartment : ''}
${order.customer.postalCode} ${order.customer.city}
${order.customer.country}
Phone: ${order.customer.phone}
Email: ${order.customer.email}

ITEMS:
${order.items.map(item => `- ${item.product.title} (${item.selectedVariant ? item.selectedVariant.value + ' - ' : ''}Qty: ${item.quantity}) - EUR ${(item.product.price * item.quantity).toFixed(2)}`).join('\n')}

-----------------------------------------------------
Subtotal: EUR ${order.subtotalEur.toFixed(2)}
Discount: -EUR ${order.discountEur.toFixed(2)} ${order.couponCode ? `(Code: ${order.couponCode})` : ''}
Shipping (${order.shippingMethod.name}): EUR ${order.shippingEur.toFixed(2)}
VAT (Included 21%): EUR ${order.vatEur.toFixed(2)}
TOTAL PAID: EUR ${order.totalEur.toFixed(2)}
Payment Method: ${
  order.paymentMethod === 'bunq' 
    ? 'BUNQ (Instant Bank Transfer)' 
    : order.paymentMethod === 'bank_transfer'
    ? 'BANK TRANSFER (SEPA European Wire)'
    : order.paymentMethod === 'usdt'
    ? 'USDT (Tether Blockchain Payment)'
    : 'CREDIT / DEBIT CARD (Visa/Mastercard)'
} (Authorized & Secured)
=====================================================
Thank you for shopping with EuroPalletLiquidation.eu!
30-Day Money-Back Guarantee • 2-Year European Consumer Warranty
=====================================================`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Receipt-${order.orderNumber}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
