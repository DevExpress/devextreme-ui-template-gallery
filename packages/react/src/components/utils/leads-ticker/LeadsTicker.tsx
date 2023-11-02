import React from 'react';

import { TickerCard } from '../../library/ticker-card/TickerCard';
import { TickerProps } from '../../../types/analytics';

export const LeadsTicker = ({ value }: TickerProps) =>
  <TickerCard
    title='Leads'
    icon='datapie'
    tone='info'
    value={value}
    percentage={8.5}
  />;
