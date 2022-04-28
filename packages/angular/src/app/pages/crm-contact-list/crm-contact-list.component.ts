import {
 Component, ViewChild, OnInit, NgModule,
} from '@angular/core';
import { getContacts } from 'dx-rwa-data';
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
import {
  CardActivitiesModule,
  ContactStatusModule,
} from 'src/app/shared/components';
import { contactStatusList, StatusContact } from 'src/app/shared/types/contact';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import CustomStore from 'devextreme/data/custom_store';
import { CommonModule } from '@angular/common';
import { UserPanelModule } from './user-panel/user-panel.component';

@Component({
  // selector: 'app-crm-contact-list',
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss'],
})
export class CrmContactListComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;

  statuses = contactStatusList;

  isPanelOpen: boolean;

  userId: number;

  dataSource: CustomStore;

  constructor() {
    this.isPanelOpen = false;

    this.rowClick = this.rowClick.bind(this);
    this.customizePhoneCell = this.customizePhoneCell.bind(this);
  }

  ngOnInit(): void {
    this.dataSource = new CustomStore({
      key: 'id',
      load: getContacts,
    });
  }

  addRow = () => {
    this.dataGrid.instance.addRow();
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  rowClick(e) {
    const { data } = e;

    this.userId = data.id;
    this.isPanelOpen = true;
  }

  rowPrepared = (e) => {
    e.rowElement.classList.add('clickable-row');
  };

  filterByStatus = (e: SelectionChangedEvent) => {
    const { item: status }: { item: StatusContact } = e;

    if (status === 'All Contacts') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  };

  formatPhone = (number: string | number): string => String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');

  customizePhoneCell(cellInfo): string {
    return this.formatPhone(cellInfo.value);
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

    UserPanelModule,

    CardActivitiesModule,
    ContactStatusModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactListComponent],
})
export class CrmContactListModule { }
