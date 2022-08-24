import { Activities } from './activities';
import { Messages } from './messages';
import { Notes } from './notes';
  
export type TaskPriority = 'Low' | 'Normal' | 'High';
  
export type TaskStatus = 'Open' | 'In Progress' | 'Deferred' | 'Completed';

export interface Task {
    id: number
    text: string,
    description: string,
    company: string,
    priority: TaskPriority,
    startDate: Date,
    dueDate: Date | null,
    owner: string,
    status: TaskStatus,
    activities: Activities,
    notes: Notes,
    messages: Messages,
};

export type TaskProp = {
    text: string
}

export interface IEdit {
    label: string;
    value: string;
    setValue: (obj: { priority?: TaskPriority, status?: TaskStatus }) => void
}
export interface IEditComponent extends IEdit {
    items: string[];
    editComponent: React.ComponentType<TaskProp>;
}