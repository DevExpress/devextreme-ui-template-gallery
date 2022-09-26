import { Activities } from './activities';
import { Notes } from './notes';
import { Messages } from './messages';

export const taskStatusList: string[] = [
  'Open',
  'In Progress',
  'Deferred',
  'Completed',
];

export const taskPriorityList: string[] = [
  'Low',
  'Normal',
  'High',
];

export type TaskPriority = (typeof taskPriorityList)[number];

export type TaskStatus = (typeof taskStatusList)[number];

export type Task = {
  activities: Activities,
  description: string,
  id: number
  text: string,
  company: string,
  priority: TaskPriority,
  startDate: string | Date,
  dueDate: string | Date,
  owner: string,
  status: TaskStatus,
  notes: Notes,
  messages: Messages,
  parentId: number,
  progress: number,
};
