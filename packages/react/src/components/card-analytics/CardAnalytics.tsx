import classNames from 'classnames';
import LoadPanel from 'devextreme-react/load-panel';
import React, { useState, useEffect } from 'react';
import './CardAnalytics.scss';

type CardProps = {
  title?: string;
};

export const CardAnalytics = ({ title, children }: React.PropsWithChildren<CardProps>) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className='card'>
      <div className='title'>{title}</div>
      <div className='content'>{children}</div>
    </div>
  );
};
