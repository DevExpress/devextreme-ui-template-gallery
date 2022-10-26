import React from 'react';

import ScrollView from 'devextreme-react/scroll-view';

import type { SingleCardProps } from '../../types';

import './single-card.scss';

export const SingleCard = ({ title, description, children }: React.PropsWithChildren<SingleCardProps>) => {
  return (
    <ScrollView height='100%' width='100%' className='with-footer single-card'>
      <div className='dx-card content'>
        <div className='header'>
          <div className='title'>{title}</div>
          <div className='description'>{description}</div>
        </div>
        {children}
      </div>
    </ScrollView>
  );
};
