import { Activities } from './card-activities';
import { Task } from './task';
import { Opportunities } from './card-opportunities';
import { CONTACT_STATUS_LIST } from '../constants';

export type ContactStatus = (typeof CONTACT_STATUS_LIST)[number];

interface State {
    stateShort: string;
}

export interface Contact {
    id: number | null,
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

export const newContact: Contact = {
  id: null,
  name: '',
  address: '',
  firstName: '',
  lastName: '',
  status: 'Salaried',
  position: '',
  manager: '',
  company: '',
  city: '',
  state: {
    stateShort: '',
  },
  zipCode: 0,
  phone: '',
  email: '',
  image: '',
  activities: [],
  opportunities: [],
  tasks: [],
};
