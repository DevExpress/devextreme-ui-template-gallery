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
      this.viewData = data;
      this.load = false;
    });
    
  }

  viewData: any;
  load = true;

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

}

