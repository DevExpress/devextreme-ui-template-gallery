import { CommonModule } from '@angular/common';
import { Component, NgModule, Input } from '@angular/core';
import { DxListModule } from 'devextreme-angular';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  constructor() { }
  @Input() activities: any;
}

@NgModule({
  imports: [ DxListModule, CommonModule ],
  declarations: [ ActivitiesComponent ],
  exports: [ ActivitiesComponent ]
})
export class ActivitiesModule { }
