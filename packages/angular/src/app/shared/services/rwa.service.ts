import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskType } from 'src/app/shared/types/task'

const API_URL = 'https://js.devexpress.com/Demos/RwaService/api';

@Injectable()
export class RwaService {
    constructor(private http: HttpClient) {
    }

    public getTasks(): Observable<TaskType[]> {
        return this.http.get<TaskType[]>(`${API_URL}/Employees/Tasks`);
    }

    public getTask(id: number): Observable<TaskType> {
        return this.http.get<TaskType>(`${API_URL}/Employees/Tasks/${id}`);
    }
}
