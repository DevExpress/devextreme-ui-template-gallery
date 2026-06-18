import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxDateBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'form-item-date',
  template: `
    <dx-date-box
      [value]="value"
      (valueChange)="onValueChange($event)"
      [readOnly]="!isEditing"
      [label]="label"
      [elementAttr]="{class: 'form-editor'}"
      [inputAttr]="{class: 'form-editor-input'}"
      stylingMode="filled"
      valueChangeEvent="keyup input change"
      placeholder="MM/dd/y"
      displayFormat="MM/dd/y"
    ></dx-date-box>`,
  imports: [
    DxDateBoxComponent,
  ],
})
export class FormDateboxComponent {
  @Input() isEditing = false;

  @Input() label = '';

  @Input() value!: string | Date | number;

  @Output() valueChange: EventEmitter<string | Date | number> = new EventEmitter();

  onValueChange(value: string | Date | number | null) {
    if (value === null) {
      return;
    }

    this.value = value;
    this.valueChange.emit(value);
  }
}
