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

export interface ContactBase {
  address: string,
  firstName: string,
  lastName: string,
  position: string,
  manager: string,
  company: string,
  phone: string,
  email: string,
  image: string,
}

export interface Contact extends ContactBase {
  id: number,
  name: string,
  status: ContactStatus,
  company: string,
  city: string,
  state: State,
  activities: Activity[],
  zipCode: number
  opportunities: Opportunities,
  tasks: Task[],
}

export const newContact: ContactBase = {
  firstName: '',
  lastName: '',
  position: '',
  manager: '',
  company: '',
  phone: '',
  email: '',
  image: '',
  address: '',
};
