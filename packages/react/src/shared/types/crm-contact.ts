import { Activities } from './card-activities';
import { Task } from './task';
import { Opportunities } from './card-opportunities';
import { CONTACT_STATUS_LIST } from '../constants';

export type ContactStatus = (typeof CONTACT_STATUS_LIST)[number];

interface State {
    stateShort: string;
}

export interface Contact {
    id: number,
    name: string,
    address: string,
    firstName: string,
    lastName: string,
    status: ContactStatus,
    position: string,
    manager: string,
    company: string,
    city: string,
    state: State,
    zipCode: number,
    phone: string,
    email: string,
    image: string,
    activities: Activities,
    opportunities: Opportunities,
    tasks: Task[],
}
