import React from 'react';

import { TickerCard } from '../../library/ticker-card/TickerCard';
import { TickerProps } from '../../../types/analytics';
import { formatCurrency } from '../../../utils/format-currency';

export const OpportunitiesTicker = ({ value }: TickerProps) =>
  <TickerCard
    title='Opportunities'
    contentClass='opportunities-total'
    value={value}
    formatValue={formatCurrency}
    percentage={20.3}
  />;
