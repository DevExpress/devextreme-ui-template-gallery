import React from 'react';

import './ContactStatus.scss';

export const ContactStatus = ({ text, showText = true }: { text: string, showText?: boolean }) => (
  <div className={`status status-contact status-${text.toLowerCase()}`}>
    <span>{showText ? text : ''}</span>
  </div>
);
