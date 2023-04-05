import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {
  map,
  groupBy,
  mergeMap,
  toArray,
} from 'rxjs/operators';
import { Task } from 'src/app/types/task';
import { Contact } from 'src/app/types/contact';
import { Sale, SalesOrOpportunitiesByCategory } from '../types/analytics';

const API_URL = 'https://js.devexpress.com/Demos/RwaService/api';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public getContacts = () =>
    this.http.get<Contact[]>(`${API_URL}/Users/Contacts`);

  public getContact = (id: number) =>
    this.http.get<Contact>(`${API_URL}/Users/Contacts/${id}`);

  public getTasks = (): Observable<Task[]> =>
    this.http.get<Task[]>(`${API_URL}/Employees/AllTasks`);

  public getFilteredTasks = (): Observable<Task[]> =>
    this.http.get<Task[]>(`${API_URL}/Employees/FilteredTasks`);

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

  public getSalesByStateAndCity = (startDate: string, endDate: string) => this.http
    .get(`${API_URL}/Analytics/SalesByStateAndCity/${startDate}/${endDate}`);

  public getSalesByState = (data) => {
    let dataByState;
    from(data)
      .pipe(
        groupBy((s: any) => s.stateName),
        mergeMap((group) => group.pipe(toArray())),
        map((val) => {
          let total = 0;
          let percentage = 0;
          val.forEach((v) => {
            total = total + v.total;
            percentage = percentage + v.percentage;
          });

          return {
            stateName: val[0].stateName,
            stateCoords: val[0].stateCoords,
            total,
            percentage,
          };
        }),
        toArray(),
      ).subscribe((data) => {
        dataByState = data;
      });

    return dataByState;
  };

  public getOpportunitiesByCategory = (startDate: string, endDate: string) => this.http
    .get<SalesOrOpportunitiesByCategory>(`${API_URL}/Analytics/OpportunitiesByCategory/${startDate}/${endDate}`);

  public getSalesByCategory = (startDate: string, endDate: string) => this.http
    .get<SalesOrOpportunitiesByCategory>(`${API_URL}/Analytics/SalesByCategory/${startDate}/${endDate}`);

  public getSalesByOrderDate = (groupByPeriod: string) => this.http
    .get<Sale[]>(`${API_URL}/Analytics/SalesByOrderDate/${groupByPeriod}`);

  public getSales = (startDate: string, endDate: string) => this.http
    .get<Sale[]>(`${API_URL}/Analytics/Sales/${startDate}/${endDate}`);
}
