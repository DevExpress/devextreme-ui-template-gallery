import { TaskProp } from '../../shared/types/task';

import './StatusTask.scss';

export const StatusTask = ({ text }: TaskProp) => (
  <div className={`status-task status-${text.toLowerCase().replace(' ', '-')}`}>
    <span>{text}</span>
  </div>
);
