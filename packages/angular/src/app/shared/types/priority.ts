export const priorityList = [
    'Low',
    'Normal',
    'High',
] as const;

export type Priority = (typeof priorityList)[number];
