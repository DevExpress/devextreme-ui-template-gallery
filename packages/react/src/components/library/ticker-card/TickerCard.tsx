import React from 'react';
import { CardAnalytics } from '../card-analytics/CardAnalytics';
import './TickerCard.scss';

export const TickerCard = ({ title, contentClass, value, percentage, formatValue = (value) => `${value}` }: {
  title: string, contentClass: string, value: number, percentage: number, formatValue?: (value: number) => string
}) => (
  <CardAnalytics contentClass={contentClass} title={title} isLoading={!value}>
    <div className='total'>{formatValue(value)}</div>
    <div className='percentage'>
      <i className={percentage >= 0 ? 'dx-icon-spinup' : 'dx-icon-spindown'} />
      <span>{`${Math.abs(percentage)}%`}</span>
    </div>
  </CardAnalytics>
);
