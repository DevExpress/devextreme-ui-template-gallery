import http from '@/api/http';
import { Contact } from '@/types/contact';
import { AxiosResponse } from 'axios';

class CrmContactService {
  getAll() {
    return http.get<Contact[]>('/Users/Contacts').then(
      (response: AxiosResponse<Contact[]>) => response.data,
    )
      .catch((e: string) => {
        console.log(e);
      });
  }
}

export default new CrmContactService();
