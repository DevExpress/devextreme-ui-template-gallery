import {
  Component, Input, NgModule, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Activities } from 'src/app/shared/types/activities';

@Component({
  selector: 'card-opportunities',
  templateUrl: './card-opportunities.component.html',
  styleUrls: ['./card-opportunities.component.scss'],
})
export class CardOpportunitiesComponent implements OnChanges {
  @Input() active: Activities;

  @Input() closed: Activities;

  messageToast = '';

  isLoading = true;

  isVisibleToast = false;

  ngOnChanges(changes: SimpleChanges) {
    const isLoadActive = changes.active?.currentValue === undefined;
    const isLoadClosed = changes.closed?.currentValue === undefined;

    this.isLoading = isLoadActive || isLoadClosed;
  }

  addOpportunity = () => {
    notify('Add opportunity event');
  };
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
