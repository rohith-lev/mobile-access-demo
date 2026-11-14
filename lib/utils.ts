export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function calculateDiscount(original: number, selling: number): number {
  return Math.round(((original - selling) / original) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateOrderId(): string {
  return 'VMT' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
}
