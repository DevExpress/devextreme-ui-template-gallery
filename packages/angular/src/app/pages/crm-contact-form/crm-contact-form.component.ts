import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getRawStatuses } from 'dx-rwa-data';
import CustomStore from 'devextreme/data/custom_store';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTabPanelModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import {
  ActivitiesModule,
  NotesModule,
  MessagesModule,
} from 'src/app/shared/components'
import { RwaService } from 'src/app/shared/services'
import { forkJoin } from 'rxjs';

type Contact = {
  name: string
};

type Opportunitie = {
  name: string,
  products: string,
  manager: string,
  total: string
};

@Component({
  templateUrl: './crm-contact-form.component.html',
  styleUrls: ['./crm-contact-form.component.scss'],
  providers: [RwaService]
})
export class CrmContactFormComponent implements OnInit {
  contactId = 12;

  contact: Contact;
  contactNotes;
  contactMessages;
  activeOpportunities: Opportunitie[];
  closedOpportunities: Opportunitie[];

  isLoading: boolean;
  isEditing: boolean;
  
  loadData = () => {
    this.isLoading = true;
  
    const observable = forkJoin({
      contact: this.service.getContact(this.contactId),
      contactNotes: this.service.getContactNotes(this.contactId),
      contactMessages: this.service.getContactMessages(this.contactId),
      activeOpportunities: this.service.getActiveContactOpportunities(this.contactId),
      closedOpportunities: this.service.getClosedContactOpportunities(this.contactId)
    });
    
    observable.subscribe((data) => {
      Object.keys(data).forEach(key => this[key] = data[key]);
  
      this.isLoading = false;
    });
  }

  constructor(private service: RwaService) {
    this.isLoading = true;
    this.isEditing = false;

    this.toggleEdit = this.toggleEdit.bind(this);
    this.refresh = this.refresh.bind(this);
    
    this.statuses = new CustomStore({
      loadMode: 'raw',
      load: getRawStatuses
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  statuses: CustomStore;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  formatPhone(number: string | number): string {
    return String(number).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");
  }

  getAvatarText(name: string) {
    return name.split(' ').map(name => name[0]).join('');
  }

  setUserName(text: string) {
    return text.replace('{username}', this.contact.name);
  }

  getSizeQualifier(width) {
    if (width < 415) return "xs";
    return "lg";
  }

  refresh() {
    this.loadData();
  }
}

@NgModule({
  imports: [
    DxFormModule,
    DxToolbarModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxLoadPanelModule,
    DxTabPanelModule,
    DxDataGridModule,

    ActivitiesModule,
    NotesModule,
    MessagesModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactFormComponent]
})
export class CrmContactFormModule { }
