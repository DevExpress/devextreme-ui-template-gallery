import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskType } from 'src/app/shared/types/task'

const API_URL = 'https://js.devexpress.com/Demos/RwaService/api';

@Injectable()
export class RwaService {
    constructor(private http: HttpClient) {
    }

    public getContacts = () => 
        this.http.get<any>(`${API_URL}/Users/Contacts`);

    public getContact = (id: number) => 
        this.http.get<any>(`${API_URL}/Users/Contacts/${id}`);

    public getTasks = (): Observable<TaskType[]> => 
        this.http.get<TaskType[]>(`${API_URL}/Employees/Tasks`);

    public getTask = (id: number): Observable<TaskType> =>
        this.http.get<TaskType>(`${API_URL}/Employees/Tasks/${id}`);

    public getContactNotes = (id: number) =>
        this.http.get(`${API_URL}/Users/Contacts/${id}/Notes`);

    public getContactMessages = (id: number) =>
        this.http.get(`${API_URL}/Users/Contacts/${id}/Messages`);

    public getActiveContactOpportunities = (id: number) => 
        this.getContactOpportunities(id, true);

    public getClosedContactOpportunities = (id: number) => 
        this.getContactOpportunities(id, false);

    public getContactOpportunities = (id: number, isActive: boolean) => {
        return this.http
            .get<any>(`${API_URL}/Users/Contacts/${id}/Opportunities`)
            .pipe(
                map(data => data.filter((_: any, index: number) => {
                    const isEven = index % 2 === 0;
                    console.log(isActive ? isEven : !isEven)
                    return isActive ? isEven : !isEven;
                }))
            );
    }
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
