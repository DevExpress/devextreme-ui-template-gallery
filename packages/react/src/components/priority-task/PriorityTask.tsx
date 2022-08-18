import React from 'react';
import './PriorityTask.scss';

const PriorityTask = ({ text }) => (
    <div className={`priority-task priority-${text.toLowerCase()}`}>
        <div className="separator-task"></div>
        <span>{text}</span>
    </div>
);

export default PriorityTask;