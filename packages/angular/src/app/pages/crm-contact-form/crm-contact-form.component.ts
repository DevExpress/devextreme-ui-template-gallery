import { Component, ViewChild, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getRawStatuses, getContact, getContactOpportunities, getContactNotes, getContactMessages } from 'dx-rwa-data';
import CustomStore from 'devextreme/data/custom_store';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTabPanelModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTileViewModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { ActivitiesModule } from 'src/app/shared/components/activities/activities.component';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './crm-contact-form.component.html',
  styleUrls: ['./crm-contact-form.component.scss']
})
export class CrmContactFormComponent implements OnInit {

  constructor(private screen: ScreenService) {
    this.toggleEdit = this.toggleEdit.bind(this);

    getContact(this.userId).then((data) => {
      this.viewData = data;
      this.load = false;
    });
    
    this.statuses = new CustomStore({
      loadMode: 'raw',
      load: getRawStatuses
    });

    this.opportunities = new CustomStore({
      loadMode: 'raw',
      load: () => getContactOpportunities(this.userId)
    });

    this.notes = getContactNotes(this.userId);
    this.messages = getContactMessages(this.userId);
  }

  userId = 12;
  viewData: any;
  load = true;
  edit = false;
  statuses: CustomStore;
  opportunities: CustomStore;
  notes: Promise<Array<{text:string, date:string, manager:string}>>;
  messages: Promise<Array<{text:string, subject:string, date:string, manager:string}>>;

  toggleEdit() {
    this.edit = !this.edit;
  }

  formatPhone(number: string | number): string {
    return String(number).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");
  }

  getAvatarText(name: string) {
    return name.split(' ').map(name => name[0]).join('');
  }

  setUserName(text: string) {
    return text.replace('{username}', this.viewData.name);
  }

  ngOnInit(): void {
    
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
    DxTextAreaModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxTileViewModule,
    ActivitiesModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactFormComponent]
})
export class CrmContactFormModule { }

