import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, map } from 'rxjs';

import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
  DxToolbarModule,
} from 'devextreme-angular';

import { DataService } from 'src/app/services';
import { Contact } from 'src/app/types/contact';
import { Messages } from 'src/app/types/messages';
import { Notes } from 'src/app/types/notes';
import { Opportunities } from 'src/app/types/opportunities';
import { ContactFormComponent } from 'src/app/components/library/contact-form/contact-form.component';
import { ContactCardsComponent } from 'src/app/components/utils/contact-cards/contact-cards.component';

@Component({
    templateUrl: './crm-contact-details.component.html',
    styleUrls: ['./crm-contact-details.component.scss'],
    providers: [ DataService ],
  imports: [
    CommonModule,

    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,

    ContactFormComponent,
    ContactCardsComponent,
  ]
})
export class CrmContactDetailsComponent implements OnInit {
  private service = inject(DataService);

  contactId = 12;

  contactData: Contact;

  contactNotes: Notes;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactName = 'Loading...';

  isLoading = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    forkJoin([
      this.service.getContactNotes(this.contactId),
      this.service.getContactMessages(this.contactId),
      this.service.getActiveContactOpportunities(this.contactId),
      this.service.getClosedContactOpportunities(this.contactId),
    ]).pipe(
      map(
        ([
          contactNotes,
          contactMessages,
          activeOpportunities,
          closedOpportunities
        ]) => ({
          contactNotes,
          contactMessages,
          activeOpportunities,
          closedOpportunities
        }))
      ).subscribe(
        (data) => Object.keys(data).forEach((key) => this[key] = data[key])
    );

    this.service.getContact(this.contactId).subscribe((data) => {
      this.contactName = data.name;
      this.contactData = data;
      this.isLoading = false;
    })
  };

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  };
}
