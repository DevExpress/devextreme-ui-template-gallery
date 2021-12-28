import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getRawStatuses, getContact } from 'dx-rwa-data';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: './crm-contact-form.component.html',
  styleUrls: ['./crm-contact-form.component.scss']
})
export class CrmContactFormComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit() {
    
  }

}

