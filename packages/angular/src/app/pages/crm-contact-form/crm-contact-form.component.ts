import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ScreenService } from '../../shared/services';
import { getContacts, getContact } from 'dx-rwa-data';

@Component({
  templateUrl: './crm-contact-form.component.html',
  styleUrls: ['./crm-contact-form.component.scss']
})
export class CrmContactFormComponent implements OnInit, AfterViewInit {

  constructor(private screen: ScreenService) {
    getContact(10).then((data) => {
      // TODO need the following additional fields
      // - firstName
      // - secondName
      // - city
      // - state
      // - zipcode
      this.viewData = data;
      this.load = false;
    });
    
  }

  viewData: any;
  load = true;

  formatPhone(number: string | number): string {
    return String(number).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

}

