import { CommonModule } from '@angular/common';
import {
  Component, NgModule, Input, SimpleChanges, OnInit, OnChanges,
} from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxMenuModule } from 'devextreme-angular/ui/menu';
import { Activities } from 'src/app/shared/types/activities';

@Component({
  selector: 'card-activities',
  templateUrl: './card-activities.component.html',
  styleUrls: ['./card-activities.component.scss'],
})
export class CardActivitiesComponent implements OnInit, OnChanges {
  @Input() activities: Activities;

  @Input() showBy? = false;

  isLoading = true;

  activityMenuItems: Array<{ icon: string, items: Array<{ text: string }> }> = [{
    icon: 'overflow',
    items: [
      { text: 'View details' },
      { text: 'Delete' },
    ],
  },
  ];

  ngOnInit() {
    this.isLoading = !this.activities;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.activities.currentValue;
  }
}

@NgModule({
  imports: [
    DxListModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxMenuModule,

    CommonModule,
  ],
  declarations: [CardActivitiesComponent],
  exports: [CardActivitiesComponent],
})
export class CardActivitiesModule { }
