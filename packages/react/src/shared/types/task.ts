import { Activities } from './activities';
import { Messages } from './messages';
import { Notes } from './notes';

export const taskStatusList = [
    'Open',
    'In Progress',
    'Deferred',
    'Completed',
] as const;

  
export type TaskPriority = 'Low' | 'Normal' | 'High';
  
export type TaskStatus = 'Open' | 'In Progress' | 'Deferred' | 'Completed';

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
    activities: Activities,
    notes: Notes,
    messages: Messages,
  };