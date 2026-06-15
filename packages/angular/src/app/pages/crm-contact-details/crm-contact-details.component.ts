import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

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

const DEFAULT_CONTACT_ID = 12;

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

  private route = inject(ActivatedRoute);

  private location = inject(Location);

  contactId: number;

  contactData = signal<Contact | undefined>(undefined);

  contactNotes = signal<Notes | undefined>(undefined);

  contactMessages = signal<Messages | undefined>(undefined);

  activeOpportunities = signal<Opportunities | undefined>(undefined);

  closedOpportunities = signal<Opportunities | undefined>(undefined);

  contactName = computed(() => this.contactData()?.name ?? 'Loading...');

  isLoading = signal(true);

  constructor() {
    const id = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '', 10);
    this.contactId = id || DEFAULT_CONTACT_ID;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    this.isLoading.set(true);

    forkJoin({
      contact: this.service.getContact(this.contactId),
      contactNotes: this.service.getContactNotes(this.contactId),
      contactMessages: this.service.getContactMessages(this.contactId),
      activeOpportunities: this.service.getActiveContactOpportunities(this.contactId),
      closedOpportunities: this.service.getClosedContactOpportunities(this.contactId),
    }).subscribe({
      next: (data) => {
        this.contactData.set(data.contact);
        this.contactNotes.set(data.contactNotes as Notes);
        this.contactMessages.set(data.contactMessages as Messages);
        this.activeOpportunities.set(data.activeOpportunities as Opportunities);
        this.closedOpportunities.set(data.closedOpportunities as Opportunities);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  };

  refresh = () => {
    this.isLoading.set(true);
    this.loadData();
  };

  navigateBack(): void {
    this.location.back();
  }
}
