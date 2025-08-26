import { Task } from '../types/task';
import { Contact } from '../types/crm-contact';

export const PRIORITY_ITEMS = ['Low', 'Normal', 'High'];
export const STATUS_ITEMS = ['Open', 'In Progress', 'Deferred', 'Completed'];

export const ANALYTICS_PERIODS = {
  Week: {
    period: '2020-01-24/2020-01-31',
    index: 0,
  },
  '2 Weeks': {
    period: '2020-01-14/2020-01-31',
    index: 1,
  },
  Month: {
    period: '2020-01-01/2020-02-01',
    index: 2,
  },
  Year: {
    period: '2020-01-01/2021-01-01',
    index: 3,
  },
  All: {
    period: '2018-01-01/2022-01-01',
    index: 4,
  },
  Custom: {
    period: '2020-05-01/2021-07-31',
    index: 5,
  }
};

export const DEFAULT_ANALYTICS_PERIOD_KEY = 'All';
export const CUSTOM_ANALYTICS_PERIOD_KEY = 'Custom';

export const CONTACT_STATUS_LIST = [
  'Salaried',
  'Commission',
  'Terminated',
];

export const newTask: Task = {
  id: 0,
  text: '',
  description: '',
  company: '',
  priority: 'Low',
  startDate: new Date(),
  dueDate: new Date(),
  owner: '',
  status: 'Open',
  activities: [],
  notes: [],
  messages: [],
  parentId: 0,
  progress: 0,
};

export const newContact: Contact = {
  id: 0,
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

export const US_STATES: string[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
];
