import {
 Component, EventEmitter, Input, NgModule, Output, ViewChild,
} from '@angular/core';
import {
  DxCalendarModule,
  DxDropDownButtonModule,

  DxDropDownButtonComponent,
} from 'devextreme-angular';
import { ValueChangedEvent } from 'devextreme/ui/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-item-date',
  templateUrl: './form-item-date.component.html',
})
export class FormItemDateComponent {
  @ViewChild('dropDownButton') dropDownButtonComponent: DxDropDownButtonComponent;

  @Input() text: string;

  @Input() value!: string | Date;

  @Output() valueChange: EventEmitter<string | Date>;

  onValueChanged = (e: ValueChangedEvent) => {
    const { value } = e;

    this.value = value;
    this.valueChange.emit(this.value);

    this.dropDownButtonComponent.instance.close();
  };

  constructor() {
    this.valueChange = new EventEmitter();
  }
}

@NgModule({
  imports: [
    DxCalendarModule,
    DxDropDownButtonModule,

    CommonModule,
  ],
  providers: [],
  exports: [FormItemDateComponent],
  declarations: [FormItemDateComponent],
})
export class FormItemDateModule { }
