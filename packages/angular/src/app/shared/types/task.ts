import { Status } from './status';
import { Priority } from './priority';

export type TaskType = {
  id: number
  text: string,
  description: string,
  company: string,
  priority: Priority,
  startDate: Date,
  dueDate: Date,
  owner: string,
  status: Status
};
