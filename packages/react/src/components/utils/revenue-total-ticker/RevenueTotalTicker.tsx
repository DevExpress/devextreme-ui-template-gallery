import React from 'react';

import { TickerCard } from '../../library/ticker-card/TickerCard';
import { TickerProps } from '../../../types/analytics';
import { formatCurrency } from '../../../utils/format-currency';

export const RevenueTotalTicker = ({ value }: TickerProps) =>
  <TickerCard
    title='Revenue Total'
    icon='dataarea'
    value={value}
    formatValue={formatCurrency}
    percentage={-14.7}
  />;
