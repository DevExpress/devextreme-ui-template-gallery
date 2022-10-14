import notify from 'devextreme/ui/notify';
import Button from 'devextreme-react/button';
import { formatDate } from 'devextreme/localization';

import { Task } from '../../../shared/types/task';

import { Avatar } from '../../avatar/Avatar';

import './Card.scss';

const onClick = (task: Task) => () => {
  notify(`Edit '${task.text}' card event`);
};

export const Card = ({ task }: { task: Task }) => {
  return (
    <div className='card dx-card dx-theme-text-color dx-theme-background-color'>
      <div className={`card-wrapper priority-${task.priority.toLowerCase()}`}>
        <div className='card-priority'></div>
        <Button className='edit-button' icon='edit' onClick={onClick(task)} />
        <div className='card-content'>
          <div className='card-subject dx-theme-text-color'>{task.text}</div>
          <div className='card-data'>
            <span className='priority'>{task.priority}</span>
            <span className='date dx-theme-text-color'>{formatDate(new Date(task.dueDate), 'MM/dd/yyyy')}</span>
          </div>
          <div className='card-assignee'>
            <span className='company dx-theme-text-color'>{task.company}</span>
            <Avatar owner={task.owner}></Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};
