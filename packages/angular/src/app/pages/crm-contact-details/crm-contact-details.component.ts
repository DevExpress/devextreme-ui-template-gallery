import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxToolbarModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  CardNotesModule,
  CardMessagesModule,
} from 'src/app/shared/components';
import { DataService } from 'src/app/shared/services';
import { forkJoin, Observable, map, Subscription } from 'rxjs';
import { Contact } from 'src/app/shared/types/contact';
import { Messages } from 'src/app/shared/types/messages';
import { Notes } from 'src/app/shared/types/notes';
import { Opportunities } from 'src/app/shared/types/opportunities';
import { ContactFormModule } from './contact-form/contact-form.component';
import { ContactCardsModule } from './contact-cards/contact-cards.component';

@Component({
  templateUrl: './crm-contact-details.component.html',
  styleUrls: ['./crm-contact-details.component.scss'],
  providers: [DataService],
})
export class CrmContactDetailsComponent implements OnInit, OnDestroy {
  contactId = 12;

  contactData$: Observable<Contact>;

  contactNotes: Notes;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactName = 'Loading...';

  subscriptions: Subscription[] = [];

  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadData = () => {
    this.contactData$ = this.service.getContact(this.contactId);

    const observable$ = forkJoin([
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
      );

    this.subscriptions.push(this.contactData$.subscribe((data) => {
      this.contactName = data.name;
    }));

    this.subscriptions.push(observable$.subscribe((data) => {
      Object.keys(data).forEach((key) => this[key] = data[key]);
    }));
  };

  refresh = () => {
    this.loadData();
  };
}

@NgModule({
  imports: [
    DxToolbarModule,
    DxButtonModule,
    DxDropDownButtonModule,

    ContactFormModule,
    ContactCardsModule,

    CardActivitiesModule,
    CardNotesModule,
    CardMessagesModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactDetailsComponent],
})
export class CrmContactDetailsModule { }
