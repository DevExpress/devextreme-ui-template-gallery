import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getContacts, getContact } from 'dx-rwa-data';
import { DxDataGridComponent } from "devextreme-angular";
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

@Component({
  //selector: 'app-crm-contact-list',
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss']
})
export class CrmContactListComponent implements OnInit, AfterViewInit {

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent

  constructor(private screen: ScreenService) {
    
    getContacts().then((data) => {
      this.gridData = data;
      this.setAvailableStatuses(data);
      this.dataGrid.instance.endCustomLoading();
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
  statuses: Array<{text: string, status: string}> = [{
    text: 'All Contacts',
    status: ''
  }];

  gridData: Array<any>;

  panelData: any;

  console(message: string) {
    console.log(message);
  }

  setAvailableStatuses(data: Array<any>) {
    const hash: any = {};
    data.forEach(dataItem => {
      const status: string = dataItem.status;
      if(!hash[status]) {
        hash[status] = true;
        this.statuses.push({ text: status, status });
      }
    });
  }

  rowClick(e) {
    this.panelLoading = true;
    getContact(e.data.id).then(data => {
      this.panelData = data;
      this.panelLoading = false;
    });

    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }

  pinClick() {
    this.isPanelPin = !this.isPanelPin;
  };

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

  ngAfterViewInit() {
    this.dataGrid.instance.beginCustomLoading('');
  }

}

