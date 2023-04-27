import { Contact } from '@/types/contact';

export interface Profile extends Contact {
  gender: string,
  birthDate: Date,
  hiredDate: Date,
  department: string,
  position: string,
  domainUsername: string,
  country: string,
  city: string,
  address: string,
  supervisor: string,
}
