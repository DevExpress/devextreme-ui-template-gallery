import { CommonModule } from '@angular/common';
import {
  Component, NgModule, Input, SimpleChanges, OnInit, OnChanges,
} from '@angular/core';
import { DxButtonModule, DxListModule, DxLoadPanelModule } from 'devextreme-angular';
import { Activities } from 'src/app/shared/types/activities';

@Component({
  selector: 'card-activities',
  templateUrl: './card-activities.component.html',
  styleUrls: ['./card-activities.component.scss'],
})
export class CardActivitiesComponent implements OnInit, OnChanges {
  @Input() activities: Activities;

  @Input() showBy? = false;

  isLoading: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.isLoading = !this.activities;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = changes.activities.currentValue === undefined;
  }
}

@NgModule({
  imports: [
    DxListModule,
    DxButtonModule,
    DxLoadPanelModule,

    CommonModule,
  ],
  declarations: [CardActivitiesComponent],
  exports: [CardActivitiesComponent],
})
export class CardActivitiesModule { }
