import { Activities } from './activities';
import { Messages } from './messages';
import { Notes } from './notes';
  
export type TaskPriority = 'Low' | 'Normal' | 'High';
  
export type TaskStatus = 'Open' | 'In Progress' | 'Deferred' | 'Completed';

export interface CommonTask {
    id: number
    text: string,
    description: string,
    company: string,
    priority: TaskPriority,
    startDate: Date,
    owner: string,
    status: TaskStatus,
    activities: Activities,
    notes: Notes,
    messages: Messages,
    parentId: number,
    progress: number,
};

export interface Task extends CommonTask {
    dueDate: Date,
}

export interface TaskProp {
    text: string;
};

export interface PlanningProps {
    dataSource: Task[]; 
};