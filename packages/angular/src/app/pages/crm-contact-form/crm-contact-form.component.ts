import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTabPanelModule,
  DxTextBoxModule,
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
import { Activities } from 'src/app/shared/types/activities';
import { ContactFormModule } from './contact-form/contact-form.component';
import { ContactCardsModule } from './contact-cards/contact-cards.component';

type Opportunitie = {
  name: string,
  products: string,
  manager: string,
  total: string
};

@Component({
  templateUrl: './crm-contact-form.component.html',
  styleUrls: ['./crm-contact-form.component.scss'],
  providers: [RwaService],
})
export class CrmContactFormComponent implements OnInit {
  contactId = 12;

  contact$: Observable<Contact>;

  activities$: Observable<Activities>;

  contactNotes: Notes;

  contactMessages: Messages;

  activeOpportunities: Opportunitie[];

  closedOpportunities: Opportunitie[];

  contactSubscription: Subscription;

  loadData = () => {
    this.contact$ = this.service.getContact(this.contactId);
    this.contactSubscription = this.contact$.subscribe((contact) => {
      this.activities$ = new Observable((obs) => obs.next(contact.activities));
    });

    const observable = forkJoin({
      contactNotes: this.service.getContactNotes(this.contactId),
      contactMessages: this.service.getContactMessages(this.contactId),
      activeOpportunities: this.service.getActiveContactOpportunities(this.contactId),
      closedOpportunities: this.service.getClosedContactOpportunities(this.contactId),
    });

    observable.subscribe((data) => {
      Object.keys(data).forEach((key) => this[key] = data[key]);
    });
  };

  constructor(private service: RwaService) {
    this.refresh = this.refresh.bind(this);
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.contactSubscription.unsubscribe();
  }

  formatPhone(number: string | number): string {
    return String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
  }

  getSizeQualifier(width) {
    if (width < 415) return 'xs';
    return 'lg';
  }

  refresh() {
    this.loadData();
  }
}

@NgModule({
  imports: [
    DxFormModule,
    DxToolbarModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxDropDownButtonModule,
    DxTabPanelModule,
    DxDataGridModule,

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
