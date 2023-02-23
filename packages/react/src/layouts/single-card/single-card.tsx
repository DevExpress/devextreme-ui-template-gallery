import React from 'react';

import ScrollView from 'devextreme-react/scroll-view';

import type { SingleCardProps } from '../../types';

import './single-card.scss';
import { switchTheme } from '../../components/theme-switcher/ThemeSwitcher';

export const SingleCard = ({ title, description, children }: React.PropsWithChildren<SingleCardProps>) => {
  switchTheme();
  return (
    <ScrollView height='100%' width='100%' className='view-wrapper-scroll single-card'>
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
