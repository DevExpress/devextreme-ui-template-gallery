import React from 'react';
import notify from 'devextreme/ui/notify';
import Button from 'devextreme-react/button';
import './Card.scss';

const onClick = (task) => () => {
  notify(`Edit '${task.text}' card event`);
}

const formatDate = (date) => {
  return [('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2), date.getFullYear()].join('/');
};

const Card = ({ task }) => {
  return (
    <div className="card dx-card dx-theme-text-color dx-theme-background-color">
      <div className={`card-wrapper priority-${(task.priority).toLowerCase()}`}>
        <div className="card-priority"></div>
        <Button className="edit-button" icon="edit" onClick={onClick(task)} />
        <div className="card-content">
          <div className="card-subject dx-theme-text-color">{task.text}</div>
          <div className="card-data">
            <span className="priority">{task.priority}</span>
            <span className="date dx-theme-text-color">{formatDate(new Date(task.dueDate))}</span>
          </div>
          <div className="card-assignee">
            <span className="company dx-theme-text-color">{task.company}</span>
            <div className="circle">{task.owner.split(' ').map((name) => name[0]).join('')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;