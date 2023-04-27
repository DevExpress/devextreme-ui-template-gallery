import React from 'react';

import type { SingleCardProps } from '../../../types';

import './CardAuth.scss';

export const CardAuth = ({ title, description, children }: React.PropsWithChildren<SingleCardProps>) => {
  return (
    <div className='auth-card'>
      <div className='dx-card content'>
        <div className='header'>
          <div className='title'>{ title }</div>
          <div className='description'>{ description }</div>
        </div>
        {children}
      </div>
    </div>
  );
};
