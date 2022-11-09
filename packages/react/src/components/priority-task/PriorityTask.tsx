import React from 'react';
import { TaskProp } from '../../shared/types/task';

import './PriorityTask.scss';

export const PriorityTask = ({ text, showText = true }: TaskProp) => (
  <div className={`priority-task priority-${text.toLowerCase()}`}>
    <div className='separator-task'></div>
    <span>{showText ? text : false}</span>
  </div>
);
