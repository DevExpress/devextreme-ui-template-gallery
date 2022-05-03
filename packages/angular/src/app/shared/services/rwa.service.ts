import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/shared/types/task';
import { Contact } from 'src/app/shared/types/contact';

const API_URL = 'https://js.devexpress.com/Demos/RwaService/api';

@Injectable()
export class RwaService {
  constructor(private http: HttpClient) {
  }

    public getContacts = () =>
      this.http.get<Contact[]>(`${API_URL}/Users/Contacts`);

    public getContact = (id: number) =>
      this.http.get<Contact>(`${API_URL}/Users/Contacts/${id}`);

    public getTasks = (): Observable<Task[]> =>
      this.http.get<Task[]>(`${API_URL}/Employees/Tasks`);

    public getTask = (id: number): Observable<Task> =>
      this.http.get<Task>(`${API_URL}/Employees/Tasks/${id}`);

    public getContactNotes = (id: number) =>
      this.http.get(`${API_URL}/Users/Contacts/${id}/Notes`);

    public getContactMessages = (id: number) =>
      this.http.get(`${API_URL}/Users/Contacts/${id}/Messages`);

    public getActiveContactOpportunities = (id: number) =>
      this.getContactOpportunities(id, true);

    public getClosedContactOpportunities = (id: number) =>
      this.getContactOpportunities(id, false);

    public getContactOpportunities = (id: number, isActive: boolean) => this.http
      .get<any>(`${API_URL}/Users/Contacts/${id}/Opportunities`)
      .pipe(
        map((data) => data.filter((_: any, index: number) => {
          const isEven = index % 2 === 0;
          return isActive ? isEven : !isEven;
        })),
      );
}

/*
export const getStatuses = async () => {
    const statuses = await getData('Users/Statuses');

    statuses.unshift({
        text: 'All Contacts',
        status: '',
    });

    return statuses;
};
export const getRawStatuses = async () => await getData('Users/Statuses');
export const getStates = async () => await getData('Users/States');
*/
