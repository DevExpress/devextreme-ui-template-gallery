export const statusList = [
    'Open',
    'In Progress',
    'Deferred',
    'Completed'
] as const;
  
export type Status = (typeof statusList)[number];
