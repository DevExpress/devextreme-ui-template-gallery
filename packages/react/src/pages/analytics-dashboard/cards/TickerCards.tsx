import React from 'react';
import { formatNumber } from 'devextreme/localization';
import { TickerCard } from '../../../components/card-analytics/TickerCard';

type TickerProps = { value: number};

const formatCurrency = (value: number) => formatNumber(value, { type: 'currency' });

const OpportunitiesTicker = ({ value }: TickerProps) =>
  <TickerCard
    title='Opportunities'
    contentClass='opportunities-total'
    value={value}
    formatValue={formatCurrency}
    percentage={20.3}
  />;

const RevenueTotalTicker = ({ value }: TickerProps) =>
  <TickerCard
    title='Revenue Total'
    contentClass='revenue-total'
    value={value}
    formatValue={formatCurrency}
    percentage={14.7}
  />;

const ConversionTicker = ({ value }: TickerProps) =>
  <TickerCard
    title='Conversion'
    contentClass='conversion'
    value={value}
    formatValue={(value) => `${value}%`}
    percentage={-2.3}
  />;

const LeadsTicker = ({ value }: TickerProps) =>
  <TickerCard
    contentClass='leads'
    title='Leads'
    value={value}
    percentage={8.5}
  />;

export { OpportunitiesTicker, RevenueTotalTicker, ConversionTicker, LeadsTicker };
