import {
 Component, EventEmitter, Input, NgModule, OnInit, Output, ViewChild,
} from '@angular/core';
import {
  DxCalendarModule,
  DxDropDownButtonModule,

  DxDropDownButtonComponent,
} from 'devextreme-angular';
import { ValueChangedEvent } from 'devextreme/ui/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form-date',
  templateUrl: './task-form-date.component.html',
  styleUrls: ['./task-form-date.component.scss'],
})
export class TaskFromDateComponent implements OnInit {
  @ViewChild('dropDownButton') dropDownButtonComponent: DxDropDownButtonComponent;

  @Input() name: string;

  @Input() text: string;

  @Output() dateChanged: EventEmitter<{ date: Date, type: string }> = new EventEmitter();

  onValueChanged = (e: ValueChangedEvent) => {
    const { value, component } = e;

    this.dateChanged.emit({
      date: value,
      type: component.option('name'),
    });

    this.dropDownButtonComponent.instance.close();
  };

  constructor() {
  }

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    DxCalendarModule,
    DxDropDownButtonModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskFromDateComponent],
  declarations: [TaskFromDateComponent],
})
export class TaskFromDateModule { }
