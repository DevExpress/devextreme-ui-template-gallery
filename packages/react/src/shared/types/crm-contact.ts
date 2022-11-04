import { Activities } from './card-activities';
import { Task } from './task';
import { Opportunities } from './oportunities';

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
  address: string,
  name: string,
  firstName: string,
  lastName: string,
  status: ContactStatus,
  position: string,
  manager: string,
  opportunities: Opportunities,
  company: string,
  city: string,
  state: State,
  phone: string,
  email: string,
  image: string,
  zipCode: string,
  tasks: Task[],
  activities: Activities,
}
