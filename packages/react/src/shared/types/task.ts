import { Activities } from './card-activities';
import { Messages } from './card-messages';
import { Notes } from './card-notes';

export type TaskPriority = 'Low' | 'Normal' | 'High';

export type TaskStatus = 'Open' | 'In Progress' | 'Deferred' | 'Completed';

export interface Task {
    id: number,
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
    dueDate: Date,
}
export interface TaskProp {
    text: string;
    showText?: boolean;
}
export interface PlanningProps {
    dataSource: Task[];
    changePopupVisibility?: () => void;
}
