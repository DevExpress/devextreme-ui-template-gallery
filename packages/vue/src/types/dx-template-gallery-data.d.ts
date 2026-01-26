declare module 'dx-template-gallery-data' {
  export interface Sale {
    date: string | Date;
    category: string;
    total: number;
  }

  export type Sales = Sale[];

  export interface SaleOrOpportunityByCategory {
    name: string;
    value: number;
  }

  export type SalesOrOpportunitiesByCategory = SaleOrOpportunityByCategory[];

  export interface SaleByState {
    stateName: string;
    stateCoords: string;
    total: number;
    percentage: number;
  }

  export type SalesByState = SaleByState[];

  export interface SaleByStateAndCity {
    stateName: string;
    stateCoords: string;
    city: string;
    total: number;
    percentage: number;
  }

  export type SalesByStateAndCity = SaleByStateAndCity[];

  export interface Contact {
    id: number;
    name: string;
    status: string;
    company: string;
    city: string;
    state: { stateShort: string };
    activities: Array<{ name: string; date: string | Date; manager: string }>;
    tasks?: any[];
    opportunities?: any[];
    notes?: any[];
    messages?: any[];
    image: string;
    [key: string]: any;
  }

  export interface Task {
    id: number;
    text: string;
    owner: string;
    priority: string;
    startDate: Date;
    dueDate: Date;
    progress: number;
    status: string;
    description?: string;
    messages?: any[];
    [key: string]: any;
  }

  export interface Activity {
    name: string;
    date: string | Date;
    manager: string;
  }

  export interface Message {
    text: string;
    author: string;
    date: Date | string;
  }

  export type Messages = Message[];

  export interface Note {
    text: string;
    author: string;
    date: Date | string;
  }

  export interface Profile {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    [key: string]: any;
  }

  export interface AppointmentData {
    startDate: Date;
    endDate?: Date;
    text?: string;
    description?: string;
    calendarId?: string;
    [key: string]: any;
  }

  export function getSales(startDate?: string, endDate?: string): Promise<Sales>;
  export function getOpportunitiesByCategory(): Promise<SalesOrOpportunitiesByCategory>;
  export function getSalesByState(startDate?: string, endDate?: string): Promise<SalesByState>;
  export function getSalesByCategory(startDate?: string, endDate?: string): Promise<SalesByStateAndCity>;
  export function getSalesByStateAndCity(startDate?: string, endDate?: string): Promise<SalesByStateAndCity>;
  export function getSalesByOrderDate(period: string): Promise<Sales>;
  export function calcSalesByState(data: any): SalesByState;
  export function getContacts(): Promise<Contact[]>;
  export function getContact(id?: number): Promise<Contact>;
  export function getContactMessages(id: number): Promise<Messages>;
  export function getContactNotes(id: number): Promise<Note[]>;
  export function getActiveContactOpportunities(id: number): Promise<any[]>;
  export function getClosedContactOpportunities(id: number): Promise<any[]>;
  export function getTasks(): Promise<Task[]>;
  export function getFilteredTasks(status?: string): Promise<Task[]>;
  export function getTask(id?: number): Promise<Task>;
  export function getTasksForScheduler(): Promise<AppointmentData[]>;
  export function getProfile(id?: number): Promise<Profile>;
  export function getSupervisors(): Promise<any[]>;
  export const defaultCalendarListItems: any[];
}
