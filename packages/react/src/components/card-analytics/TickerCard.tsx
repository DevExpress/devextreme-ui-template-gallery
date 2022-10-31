import React from 'react';
import { CardAnalytics } from './CardAnalytics';

export const TickerCard = ({ title, contentClass, value, percentage, formatValue = (value) => value }) => (
  <CardAnalytics contentClass={contentClass} title={title} isLoading={!value} compact>
    <div className='total'>{formatValue(value)}</div>
    <div className='percentage'>
      <i className={percentage >= 0 ? 'dx-icon-spinup' : 'dx-icon-spindown'}></i>
      <span>{`${Math.abs(percentage)}%`}</span>
    </div>
  </CardAnalytics>
);
