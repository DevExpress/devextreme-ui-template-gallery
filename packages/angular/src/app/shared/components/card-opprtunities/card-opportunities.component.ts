import {
  Component, Input, NgModule, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Activity } from 'src/app/shared/types/activities';

@Component({
  selector: 'card-opportunities',
  templateUrl: './card-opportunities.component.html',
  styleUrls: ['./card-opportunities.component.scss'],
})
export class CardOpportunitiesComponent implements OnChanges {
  @Input() openedActivities: Activity[];

  @Input() closedActivities: Activity[];

  isLoading = true;

  ngOnChanges(changes: SimpleChanges) {
    const isLoadActive = !changes.openedActivities?.currentValue;
    const isLoadClosed = !changes.closedActivities?.currentValue;

    this.isLoading = isLoadActive || isLoadClosed;
  }

  addOpportunity = () => {
    notify('Add opportunity event');
  };

  opportunityClick() {
    notify('Click opportunity event');
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxLoadPanelModule,

    CommonModule,
  ],
  declarations: [CardOpportunitiesComponent],
  exports: [CardOpportunitiesComponent],
})
export class CardOpportunitiesModule { }
