import { AxiosResponse } from 'axios';
import http from '@/api/http';
import { Contact } from '@/types/contact';

class ContactListService {
  getAll() {
    return http.get<Contact[]>('/Users/Contacts').then(
      (response: AxiosResponse<Contact[]>) => response.data,
    )
      .catch((e: string) => {
        console.log(e);
      });
  }
}

export default new ContactListService();
