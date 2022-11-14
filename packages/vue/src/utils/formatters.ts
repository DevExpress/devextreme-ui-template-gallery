import { formatNumber, formatDate as formatLocDate } from 'devextreme/localization';

export function formatPhone(number: string): string {
  return String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
}

export function formatPrice(price: number, precision?: number): string {
  return formatNumber(price, {
    type: 'currency',
    precision: precision || 0,
    currency: 'USD',
  });
}

export function formatDate(date: Date): string {
  return formatLocDate(new Date(date), 'MM/dd/yyyy');
}
