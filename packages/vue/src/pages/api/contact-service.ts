import http from '@/api/http';
import { Contact } from '@/types/contact';

class ContactService {
  getContact(id: number) {
    return http.get<Contact>(`/Users/Contacts/${id}`);
  }
}

export default new ContactService();
