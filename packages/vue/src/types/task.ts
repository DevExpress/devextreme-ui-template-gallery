import type { Activity } from '@/types/activities';
import type { Notes } from '@/types/notes';
import type { Messages } from '@/types/messages';

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

export interface Task {
  id: number
  text: string,
  description: string,
  company: string,
  priority: TaskPriority,
  startDate: Date,
  dueDate: Date,
  owner: string,
  status: TaskStatus,
  activities: Activity[],
  notes: Notes,
  messages: Messages,
  parentId: number,
  progress: number,
}
