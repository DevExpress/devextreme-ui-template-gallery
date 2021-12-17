import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getContacts, getContact } from 'dx-rwa-data';

@Component({
  //selector: 'app-crm-contact-list',
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss']
})
export class CrmContactListComponent implements OnInit {

  constructor(private screen: ScreenService) {
    getContacts().then((data) => {
      this.gridData = data;
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

  gridData: Array<any>;

  panelData: any;

  console(message: string) {
    console.log(message);
  }

  rowClick(e) {
    getContact(e.data.id).then(data => {
      this.panelData = data;
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

  ngOnInit(): void {
  }

}

