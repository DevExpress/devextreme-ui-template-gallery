import http from '@/api/http';

class NotesService {
  public getContactNotes = (id: number) => http.get(`/Users/Contacts/${id}/Notes`)
    .then((response) => response.data);
}

export default new NotesService();
