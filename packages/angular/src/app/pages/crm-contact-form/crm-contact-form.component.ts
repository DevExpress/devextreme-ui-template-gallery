import { Component, ViewChild, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getRawStatuses, getContact } from 'dx-rwa-data';
import CustomStore from 'devextreme/data/custom_store';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTabPanelModule,
  DxTextBoxModule,
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

    getContact(10).then((data) => {
      this.viewData = data;
      this.load = false;
    });
    
    this.statuses = new CustomStore({
      loadMode: 'raw',
      load: getRawStatuses
    });
  }

  viewData: any;
  load = true;
  edit = false;
  statuses: CustomStore;

  toggleEdit() {
    this.edit = !this.edit;
  }

  formatPhone(number: string | number): string {
    return String(number).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");
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
    DxDataGridModule,
    DxCheckBoxModule,
    ActivitiesModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactFormComponent]
})
export class CrmContactFormModule { }

