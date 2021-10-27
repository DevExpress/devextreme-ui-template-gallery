import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'app-crm-contact-list',
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss']
})
export class CrmContactListComponent implements OnInit {

  constructor() {
    this.pinClick = this.pinClick.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }

  isPanelOpen: boolean = false;
  isPanelPin: boolean = false;

  gridData: any[] = [{
    name: 'Robert Reaga',
    status: 1,
    id: 120545,
    products: [
      { productId: 1, productStatus: 1 },
      { productId: 2, productStatus: 2 }
    ],
    manager: 'Sarah Davix',
    organization: 'SV Consult',
    address: '69 Ruthven St #24, Boston, MA 02121, United States of America',
    email: '1@2',
  },{
    name: 'Samuel Browick',
    status: 2,
    id: 120545,
    products: [
      { productId: 1, productStatus: 2 },
      { productId: 2, productStatus: 1 }
    ],
    manager: 'Brett Johnson',
    organization: 'SV Consult',
    address: '69 Ruthven St #24, Boston, MA 02121, United States of America',
    email: '2@2',
  }];

  statuses: any = {
    1: 'New',
    2: 'Active',
  };

  products: any = {
    1: 'CRM System',
    2: 'Task Management',
  };

  productStatuses: any = {
    1: 'Lead',
    2: 'Trial sent'
  };

  panelData: any = this.gridData[0];

  console(message: string) {
    console.log(message);
  }

  rowClick(e) {
      this.panelData = e.data;
      this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }

  pinClick() {
    this.isPanelPin = !this.isPanelPin;
  };

  ngOnInit(): void {
  }

}

