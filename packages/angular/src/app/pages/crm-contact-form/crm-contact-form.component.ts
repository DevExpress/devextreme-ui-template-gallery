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
import { RwaService } from 'src/app/shared/services';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/shared/types/contact';
import { Messages } from 'src/app/shared/types/messages';
import { Notes } from 'src/app/shared/types/notes';
import { Opportunities } from 'src/app/shared/types/opportunities';
import { ContactFormModule } from './contact-form/contact-form.component';
import { ContactCardsModule } from './contact-cards/contact-cards.component';

@Component({
  templateUrl: './crm-contact-form.component.html',
  styleUrls: ['./crm-contact-form.component.scss'],
  providers: [RwaService],
})
export class CrmContactFormComponent implements OnInit, OnDestroy {
  contactId = 12;

  contact$: Observable<Contact>;

  contactNotes: Notes;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactSubscription: Subscription = new Subscription();

  loadData = () => {
    this.contact$ = this.service.getContact(this.contactId);

    const observable = forkJoin({
      contactNotes: this.service.getContactNotes(this.contactId),
      contactMessages: this.service.getContactMessages(this.contactId),
      activeOpportunities: this.service.getActiveContactOpportunities(this.contactId),
      closedOpportunities: this.service.getClosedContactOpportunities(this.contactId),
    });

    this.contactSubscription = observable.subscribe((data) => {
      Object.keys(data).forEach((key) => this[key] = data[key]);
    });
  };

  constructor(private service: RwaService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.contactSubscription.unsubscribe();
  }

  refresh() {
    this.loadData();
  }

  formatPhone = (number: string | number) => String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');

  getSizeQualifier = (width: number) => (width < 415 ? 'xs' : 'lg');
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
  declarations: [CrmContactFormComponent],
})
export class CrmContactFormModule { }
