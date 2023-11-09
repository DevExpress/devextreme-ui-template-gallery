import {
  Component, EventEmitter, Input, NgModule, Output, ViewChild,
} from '@angular/core';
import {
  DxCalendarModule,
  DxDropDownButtonModule,
  DxDropDownButtonComponent,
  DxDateBoxModule,
} from 'devextreme-angular';

import { DxCalendarTypes } from 'devextreme-angular/ui/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-item-date',
  template: `
    <dx-date-box
      [(value)]="value"
      [readOnly]="!isEditing"
      [label]="label"
      [elementAttr]="{class: 'form-editor'}"
      [inputAttr]="{class: 'form-editor-input'}"
      stylingMode="filled"
      placeholder="MM/dd/y"
      displayFormat="MM/dd/y"
      pickerType="calendar"
  ></dx-date-box>`,
})
export class FormDateboxComponent {
  @ViewChild(DxDropDownButtonComponent) dropDownButtonComponent: DxDropDownButtonComponent;

  @Input() isEditing = false;

  @Input() label = '';

  @Input() value!: string | Date | number;

  @Output() valueChange: EventEmitter<string | Date | number> = new EventEmitter();

  onValueChanged = (e: DxCalendarTypes.ValueChangedEvent) => {
    const { value } = e;

    this.value = value;
    this.valueChange.emit(this.value);

    this.dropDownButtonComponent.instance.close();
  };
}

@NgModule({
  imports: [
    DxCalendarModule,
    DxDropDownButtonModule,
    DxDateBoxModule,
    CommonModule,
  ],
  providers: [],
  exports: [FormDateboxComponent],
  declarations: [FormDateboxComponent],
})
export class FormItemDateModule { }
