import React from 'react';

import { TickerCard } from '../../library/ticker-card/TickerCard';
import { TickerProps } from '../../../types/analytics';

export const LeadsTicker = ({ value }: TickerProps) =>
  <TickerCard
    contentClass='leads'
    title='Leads'
    value={value}
    percentage={8.5}
  />;
