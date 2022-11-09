import React from 'react';
import { TaskProp } from '../../shared/types/task';

export const StatusTask = ({ text, showText = true }: TaskProp) => (
  <div className={`status-task status-${text.toLowerCase().replace(' ', '-')}`}>
    <span>{showText ? text : ''}</span>
  </div>
);
