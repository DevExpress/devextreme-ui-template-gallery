import { CommonModule } from '@angular/common';
import {
  Component, NgModule, Input, SimpleChanges, OnInit, OnChanges,
} from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { CardMenuModule } from '../card-menu/card-menu.component';
import { Activity } from 'src/app/types/activities';

@Component({
  selector: 'card-activities',
  templateUrl: './card-activities.component.html',
  styleUrls: ['./card-activities.component.scss'],
})
export class CardActivitiesComponent {
  @Input() activities: Activity[];

  @Input() showBy? = false;

  @Input() isLoading: boolean = false;

  activityMenuItems: Array<{ text: string }> = [
    { text: 'View details' },
    { text: 'Delete' },
  ];
}

@NgModule({
  imports: [
    DxListModule,
    DxButtonModule,
    DxLoadPanelModule,
    CardMenuModule,

    CommonModule,
  ],
  declarations: [CardActivitiesComponent],
  exports: [CardActivitiesComponent],
})
export class CardActivitiesModule { }
