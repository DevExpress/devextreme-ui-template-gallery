import React, { useCallback } from 'react';
import notify from 'devextreme/ui/notify';
import { useNavigate } from 'react-router-dom';

import Button from 'devextreme-react/button';
import { formatDate } from 'devextreme/localization';

import { Task } from '../../../types/task';

import { UserAvatar } from '../user-avatar/UserAvatar';

import './TaskKanbanCard.scss';

const onClick = (task: Task) => (e) => {
  e.event.stopPropagation();
  notify(`Edit '${task.text}' card event`);
};

export const TaskKanbanCard = ({ task }: { task: Task }) => {
  const navigate = useNavigate();

  const navigateToDetails = useCallback(() => {
    navigate('/planning-task-details');
  }, []);

  return (
    <div className='kanban-card dx-card dx-theme-text-color dx-theme-background-color' onClick={navigateToDetails}>
      <div className={`card-wrapper priority-${task.priority.toLowerCase()}`}>
        <div className='card-priority' />
        <Button
          className='edit-button'
          icon='edit'
          stylingMode='text'
          onClick={onClick(task)}
        />
        <div className='card-content'>
          <div className='card-subject dx-theme-text-color'>{task.text}</div>
          <div className='card-data'>
            <span className='priority'>{task.priority}</span>
            <span className='date dx-theme-text-color'>{formatDate(new Date(task.dueDate), 'MM/dd/yyyy')}</span>
          </div>
          <div className='card-assignee'>
            <span className='company dx-theme-text-color'>{task.company}</span>
            <UserAvatar owner={task.owner} />
          </div>
        </div>
      </div>
    </div>
  );
};
