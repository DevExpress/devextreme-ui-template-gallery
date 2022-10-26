import React from 'react';
import { TickerCard } from '../../../components/card-analytics/TickerCard';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const OpportunitiesTicker = ({ value }) => <TickerCard title='Opportunities' contentClass='opportunities-total' value={value} formatValue={currencyFormatter.format} percentage={20.3} />;

const RevenueTotalTicker = ({ value }) => <TickerCard title='Revenue Total' contentClass='revenue-total' value={value} formatValue={currencyFormatter.format} percentage={14.7} />;

const ConversionTicker = ({ value }) => <TickerCard title='Conversion' contentClass='conversion' value={value} formatValue={(value) => `${value}%`} percentage={-2.3} />;

const LeadsTicker = ({ value }) => <TickerCard contentClass='leads' title='Leads' value={value} percentage={8.5} />;

export { OpportunitiesTicker, RevenueTotalTicker, ConversionTicker, LeadsTicker };
