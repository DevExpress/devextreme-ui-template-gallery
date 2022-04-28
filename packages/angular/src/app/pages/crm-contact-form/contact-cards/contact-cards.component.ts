import {
    Component, OnInit, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,
} from 'devextreme-angular';
import {
    CardNotesModule,
    CardMessagesModule,
    CardActivitiesModule,
    CardOpportunitiesModule,
    CardTasksModule,
} from 'src/app/shared/components';
import { Activities } from 'src/app/shared/types/activities';
import { Messages } from 'src/app/shared/types/messages';
import { Notes } from 'src/app/shared/types/notes';

@Component({
    selector: 'contact-cards',
    templateUrl: './contact-cards.component.html',
    styleUrls: ['./contact-cards.component.scss'],
})
export class ContactCardsComponent implements OnInit {
    @Input() tasks;

    @Input() activities: Activities;

    @Input() activeOpportunities;

    @Input() closedOpportunities;

    @Input() notes: Notes;

    @Input() messages: Messages;

    @Input() contactName: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}

@NgModule({
    imports: [
        DxButtonModule,
        DxTabPanelModule,
        DxDataGridModule,

        CardNotesModule,
        CardMessagesModule,
        CardActivitiesModule,
        CardOpportunitiesModule,
        CardTasksModule,

        CommonModule,
    ],
    providers: [],
    exports: [ContactCardsComponent],
    declarations: [ContactCardsComponent],
})
export class ContactCardsModule { }
