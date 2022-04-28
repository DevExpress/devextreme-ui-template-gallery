import { Status } from './status';
import { Priority } from './priority';
import { Activities } from './activities';
import { Notes } from './notes';
import { Messages } from './messages';

export type Task = {
  id: number
  text: string,
  description: string,
  company: string,
  priority: Priority,
  startDate: Date,
  dueDate: Date,
  owner: string,
  status: Status,
  activities: Activities,
  notes: Notes,
  messages: Messages,
};
