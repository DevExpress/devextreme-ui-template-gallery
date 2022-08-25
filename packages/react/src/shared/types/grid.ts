import { TaskPriority, TaskStatus, TaskProp } from './task';

export interface GridEdit {
    setValue: (obj: { priority?: TaskPriority, status?: TaskStatus }) => void
}
export interface GridEditComponent extends GridEdit {
    items: string[];
    editComponent: React.ComponentType<TaskProp>;
}