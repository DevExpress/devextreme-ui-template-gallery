import {
  Component, OnInit, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  CardNotesModule,
  CardMessagesModule,
} from 'src/app/components';
import { DataService } from 'src/app/services';
import { forkJoin, map } from 'rxjs';
import { Contact } from 'src/app/types/contact';
import { Messages } from 'src/app/types/messages';
import { Notes } from 'src/app/types/notes';
import { Opportunities } from 'src/app/types/opportunities';
import { ContactFormModule } from 'src/app/components/library/contact-form/contact-form.component';
import { ContactCardsModule } from 'src/app/components/utils/contact-cards/contact-cards.component';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

const DEFAULT_CONTACT_ID = 12;

@Component({
  templateUrl: './crm-contact-details.component.html',
  styleUrls: ['./crm-contact-details.component.scss'],
  providers: [DataService],
})
export class CrmContactDetailsComponent implements OnInit {
  contactId: number;

  contactData: Contact;

  contactNotes: Notes;

  contactMessages: Messages;

  activeOpportunities: Opportunities;

  closedOpportunities: Opportunities;

  contactName = 'Loading...';

  isLoading = false;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.contactId = id ? parseInt(id, 10) : DEFAULT_CONTACT_ID;
  }

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

  navigateBack(): void {
    this.router.navigate(['/crm-contact-list']);
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,

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
