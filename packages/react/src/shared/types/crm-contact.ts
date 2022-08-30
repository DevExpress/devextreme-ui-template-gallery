import { Activities } from './card-activities';

export const contactStatusList = [
  'Salaried',
  'Commission',
  'Terminated',
] as const;

export type ContactStatus = (typeof contactStatusList)[number];

interface State {
    stateShort: string;
};

export interface Contact {
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
    activities: Activities,
};
