import http from '@/api/http';
import { Contact } from '@/types/contact';

class ContactPanelService {
     getContact = (id: number) => http.get<Contact>(`/Users/Contacts/${id}`);
}

export default new ContactPanelService();
