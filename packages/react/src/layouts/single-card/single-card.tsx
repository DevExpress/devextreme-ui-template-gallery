import React from 'react';

import ScrollView from 'devextreme-react/scroll-view';
import { CardAuth } from '../../components';

import type { SingleCardProps } from '../../types';

import './single-card.scss';

export const SingleCard = ({ title, description, children }: React.PropsWithChildren<SingleCardProps>) => {
  return (
    <ScrollView height='100%' width='100%' className='view-wrapper-scroll single-card'>
      <CardAuth title={title} description={description}>
        {children}
      </CardAuth>
    </ScrollView>
  );
};
