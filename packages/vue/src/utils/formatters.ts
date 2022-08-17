import { formatNumber } from 'devextreme/localization';

export function formatPhone(number: string): string {
  return String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
}

export function formatPrice(price: number): string {
  return formatNumber(price, {
    type: 'currency',
    // precision: 0,
    currency: 'USD',
  });
}

export function formatDate(date: Date): string {
  return (new Intl.DateTimeFormat('en', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })).format(date);
}
