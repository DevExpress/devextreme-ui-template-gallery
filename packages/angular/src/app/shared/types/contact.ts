import { Activities } from './activities';

export const contactStatusList = [
    'All Contacts',
    'Salaried',
    'Commission',
    'Terminated',
] as const;

export type StatusContact = (typeof contactStatusList)[number];

type State = {
    stateShort: string;
};

export type Contact = {
    name: string,
    firstName: string,
    lastName: string,
    status: StatusContact,
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
