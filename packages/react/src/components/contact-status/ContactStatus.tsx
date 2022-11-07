import React from 'react';

import './ContactStatus.scss';

export const ContactStatus = ({ text }: { text: string }) => (
  <div className={`status-contact status-${text.toLowerCase()}`}>
    <span>{text}</span>
  </div>
);
