import { Opportunities } from './opportunities';
import { Task } from './task';
import type { Activity } from './activities';

export const contactStatusList = [
  'Salaried',
  'Commission',
  'Terminated',
] as const;

export type ContactStatus = (typeof contactStatusList)[number];

interface State {
    stateShort: string;
}

export interface Contact {
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
  phone: string,
  email: string,
  image: string,
  activities: Activity[],
  zipCode: number | null
  opportunities: Opportunities,
  tasks: Task[],
}

export const newContact: Contact = {
  name: '',
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
  zipCode: null,
  activities: [],
  opportunities: [],
  tasks: [],
};
