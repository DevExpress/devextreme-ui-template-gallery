import React from 'react';
import { TaskPriority, TaskStatus, CommonTask, TaskProp } from './task';

export interface FormEdit {
    label: string;
    value: string;
    setValue: (obj: { priority?: TaskPriority, status?: TaskStatus }) => void
}
export interface FormEditComponent extends FormEdit {
    items: string[];
    editComponent: React.ComponentType<TaskProp>;
}

export interface FormTask extends CommonTask {
    dueDate: Date | null,
}
