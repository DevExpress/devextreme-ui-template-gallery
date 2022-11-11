import { Activities } from './card-activities';
import { Task } from './task';
import { Opportunities } from './card-opportunities';
import { CONTACT_STATUS_LIST } from '../constants';

export type ContactStatus = (typeof CONTACT_STATUS_LIST)[number];

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
  zipCode: number,
  tasks: Task[],
  activities: Activities,
}
