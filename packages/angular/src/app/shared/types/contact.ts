import { Activities } from './activities';
import { Task } from './task';
import { Opportunities } from './opportunities';

export const contactStatusList: string[] = [
  'Salaried',
  'Commission',
  'Terminated',
];

export type ContactStatus = (typeof contactStatusList)[number];

type State = {
    stateShort: string;
};

export type Contact = {
    name: string,
    address: string,
    firstName: string,
    lastName: string,
    status: ContactStatus,
    position: string,
    manager: string,
    opportunities: Opportunities,
    company: string,
    city: string,
    state: State,
    tasks: Task[],
    phone: string,
    email: string,
    image: string,
    zipCode: string,
    activities: Activities,
};

export const newContact: Contact = { 
  name: 'New Contact',
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
  phone: '',
  email: '',
  image: '',
  address: '',
  zipCode: '',
  activities: [],
  opportunities: [],
  tasks: [],
}
