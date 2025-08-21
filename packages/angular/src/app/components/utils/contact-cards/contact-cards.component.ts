import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTabPanelModule,
  DxDataGridModule,
} from 'devextreme-angular';
import {
  CardNotesComponent,
  CardMessagesComponent,
  CardActivitiesComponent,
  CardOpportunitiesComponent,
  CardTasksComponent,
} from 'src/app/components';
import { Activity } from 'src/app/types/activities';
import { Messages } from 'src/app/types/messages';
import { Notes } from 'src/app/types/notes';
import { Opportunities } from 'src/app/types/opportunities';
import { Task } from 'src/app/types/task';

@Component({
    selector: 'contact-cards',
    templateUrl: './contact-cards.component.html',
    styleUrls: ['./contact-cards.component.scss'],
    imports: [
      DxButtonModule,
      DxTabPanelModule,
      DxDataGridModule,

      CardNotesComponent,
      CardMessagesComponent,
      CardActivitiesComponent,
      CardOpportunitiesComponent,
      CardTasksComponent,

      CommonModule,
    ],
})
export class ContactCardsComponent {
    @Input() tasks: Task[];

    @Input() activities: Activity[];

    @Input() activeOpportunities: Opportunities;

    @Input() closedOpportunities: Opportunities;

    @Input() notes: Notes;

    @Input() messages: Messages;

    @Input() contactName: string;

    @Input() isLoading: boolean;
}

