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
export class TaskFormDateComponent implements OnInit {
  @ViewChild('dropDownButton') dropDownButtonComponent: DxDropDownButtonComponent;

  @Input() type: string;

  @Input() text: string;

  @Output() dateChanged: EventEmitter<{ date: Date, type: string }> = new EventEmitter();

  onValueChanged = (e: ValueChangedEvent) => {
    const { value, component } = e;

    this.dateChanged.emit({
      date: value,
      type: component.option('name').toLowerCase(),
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
  exports: [TaskFormDateComponent],
  declarations: [TaskFormDateComponent],
})
export class TaskFormDateModule { }
