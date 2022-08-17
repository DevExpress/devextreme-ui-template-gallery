import http from '@/api/http';

class CrmContactService {
     getAll = () =>
       http.get('/Users/Contacts');
}

export default new CrmContactService();
