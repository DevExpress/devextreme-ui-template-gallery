import http from '@/api/http';

class MessagesService {
  public getContactMessages = (id: number) => http.get(`/Users/Contacts/${id}/Messages`)
    .then((response) => response.data);
}

export default new MessagesService();
