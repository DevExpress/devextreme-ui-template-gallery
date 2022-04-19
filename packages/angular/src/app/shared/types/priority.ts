export const priorityList = [
    'Low',
    'Normal',
    'Hight',
] as const;

export type Priority = (typeof priorityList)[number];
