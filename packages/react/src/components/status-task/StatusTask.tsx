import React from 'react';
import './StatusTask.scss';

const StatusTask = ({ text }) => (
    <span className={`status-task status-${text.toLowerCase().replace(' ', '-')}`}>{text}</span>
);

export default StatusTask;