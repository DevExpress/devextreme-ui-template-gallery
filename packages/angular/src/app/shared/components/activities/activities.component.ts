import { CommonModule } from '@angular/common';
import { Component, NgModule, Input } from '@angular/core';
import { DxButtonModule, DxListModule } from 'devextreme-angular';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  constructor() { }

  @Input() activities: Array<{ name: string, date: string, manager: string }>;

  @Input() showBy = false;
}

@NgModule({
  imports: [DxListModule, DxButtonModule, CommonModule],
  declarations: [ActivitiesComponent],
  exports: [ActivitiesComponent],
})
export class ActivitiesModule { }
