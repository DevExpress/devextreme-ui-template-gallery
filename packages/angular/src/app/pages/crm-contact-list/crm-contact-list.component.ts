import { Component, ViewChild, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getContacts, getContact, getStatuses } from 'dx-rwa-data';
import {
  DxDataGridModule,
  DxFormModule,
  DxDrawerModule,
  DxButtonModule,
  DxToolbarModule,
  DxScrollViewModule,
  DxAccordionModule,
  DxListModule,
  DxLoadPanelModule,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxDataGridComponent,
} from 'devextreme-angular';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import CustomStore from 'devextreme/data/custom_store';
import { ActivitiesModule } from 'src/app/shared/components/activities/activities.component';
import { CommonModule } from '@angular/common';



@Component({
  //selector: 'app-crm-contact-list',
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss']
})
export class CrmContactListComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent

  constructor(private screen: ScreenService) {

    this.dataSource = new CustomStore({
      key: 'id',
      load: getContacts
    });

    this.statuses = new CustomStore({
      loadMode: 'raw',
      load: getStatuses
    });

    this.pinClick = this.pinClick.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.customizePhoneCell = this.customizePhoneCell.bind(this);
    this.calculatePin();
    this.screen.changed.subscribe(this.calculatePin.bind(this));
  }

  isPanelOpen: boolean = false;
  isPanelPin: boolean = false;
  isPinEnabled: boolean = false;
  panelLoading: boolean = true;

  dataSource: CustomStore;
  statuses: CustomStore;


  panelData: any;

  console(message: string) {
    console.log(message);
  }

  rowClick(e) {
    this.panelLoading = true;
    getContact(e.data.id).then(data => {
      this.panelData = data;
      this.panelLoading = false;
    });

    this.isPanelOpen = true;
  }

  rowPrepared(e) {
    e.rowElement.classList.add('clickable-row');
  }

  closePanel() {
    this.isPanelOpen = false;
  }

  pinClick() {
    this.isPanelPin = !this.isPanelPin;
  };

  accordionTitleClick(e) {
    e.event.stopPropagation();
  }

  calculatePin() {
    this.isPinEnabled = this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'];
    if(this.isPanelPin && !this.isPinEnabled) {
      this.isPanelPin = false;
    }
  }

  formatPhone(number: string | number): string {
    return String(number).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");
  }

  customizePhoneCell(cellInfo): string {
    return this.formatPhone(cellInfo.value);
  }

  filterStatus(e: SelectionChangedEvent) {
    const status = e.item.status;
    if(status === '') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  }

  ngOnInit(): void {
    
  }

}



@NgModule({
  imports: [
    DxDataGridModule,
    DxFormModule,
    DxDrawerModule,
    DxButtonModule,
    DxToolbarModule,
    DxScrollViewModule,
    DxAccordionModule,
    DxListModule,
    DxLoadPanelModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,

    ActivitiesModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactListComponent]
})
export class CrmContactListModule { }
