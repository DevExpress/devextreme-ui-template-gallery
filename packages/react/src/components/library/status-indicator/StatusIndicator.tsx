import React from 'react';
import { TaskProp } from '../../../types/task';

export const StatusIndicator = ({ text }: TaskProp) => (
  <div className={`item-field item-${text.toLowerCase().replace('| ', '').replace(' ', '-')}`}>
    <span>{text}</span>
  </div>
);
