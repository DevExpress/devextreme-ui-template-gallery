import React from 'react';
import { TaskProp } from '../../shared/types/task';
import './StatusTask.scss';

const StatusTask = ({ text }: TaskProp) => (
    <span className={`status-task status-${text.toLowerCase().replace(' ', '-')}`}>{text}</span>
);

export default StatusTask;