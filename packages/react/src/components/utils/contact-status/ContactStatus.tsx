import React from 'react';

import './ContactStatus.scss';

export const ContactStatus = ({ text, contentClass, showText = true }: { text: string, contentClass?: string, showText?: boolean }) => (
  <div className={`status-contact status-${text?.toLowerCase()} ${contentClass}`}>
    <span className='status'>{showText ? text : ''}</span>
  </div>
);
