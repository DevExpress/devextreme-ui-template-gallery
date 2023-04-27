import { formatNumber } from 'devextreme/localization';

export const formatCurrency = (value: number) => formatNumber(value, { type: 'currency' });
