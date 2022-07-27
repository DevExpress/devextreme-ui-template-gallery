import React from 'react';
import './Card.scss';

const Card = ({ task }) => {
    return <div className="card dx-card dx-theme-text-color dx-theme-background-color">
    <div className={`card-priority priority-${(task.priority).toLowerCase()}`}></div>
    <div className="card-title">{task.text}</div>
  </div>;
}

export default Card;