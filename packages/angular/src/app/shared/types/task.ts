import { Activities } from './activities';
import { Notes } from './notes';
import { Messages } from './messages';

export const taskStatusList = [
  'Open',
  'In Progress',
  'Deferred',
  'Completed',
] as const;

export const taskPriorityList = [
  'Low',
  'Normal',
  'High',
] as const;

export type TaskPriority = (typeof taskPriorityList)[number];

export type TaskStatus = (typeof taskStatusList)[number];

export type Task = {
  id: number
  text: string,
  description: string,
  company: string,
  priority: TaskPriority,
  startDate: Date,
  dueDate: Date,
  owner: string,
  status: TaskStatus,
  activities: Activities,
  notes: Notes,
  messages: Messages,
};
