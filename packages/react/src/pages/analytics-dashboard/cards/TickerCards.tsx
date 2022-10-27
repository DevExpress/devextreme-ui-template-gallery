import React from 'react';
import { formatNumber } from 'devextreme/localization';
import { TickerCard } from '../../../components/card-analytics/TickerCard';

const formatCurrency = (value) => formatNumber(value, { type: 'currency' });

const OpportunitiesTicker = ({ value }) => <TickerCard title='Opportunities' contentClass='opportunities-total' value={value} formatValue={formatCurrency} percentage={20.3} />;

const RevenueTotalTicker = ({ value }) => <TickerCard title='Revenue Total' contentClass='revenue-total' value={value} formatValue={formatCurrency} percentage={14.7} />;

const ConversionTicker = ({ value }) => <TickerCard title='Conversion' contentClass='conversion' value={value} formatValue={(value) => `${value}%`} percentage={-2.3} />;

const LeadsTicker = ({ value }) => <TickerCard contentClass='leads' title='Leads' value={value} percentage={8.5} />;

export { OpportunitiesTicker, RevenueTotalTicker, ConversionTicker, LeadsTicker };
