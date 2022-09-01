import type { Activity } from './activities';

export const contactStatusList = [
  'Salaried',
  'Commission',
  'Terminated',
] as const;

export type ContactStatus = (typeof contactStatusList)[number];

type State = {
    stateShort: string;
};

export type Contact = {
    name: string,
    firstName: string,
    lastName: string,
    status: ContactStatus,
    position: string,
    manager: string,
    company: string,
    city: string,
    state: State,
    phone: string,
    email: string,
    image: string,
    activities: Activity[],
};
