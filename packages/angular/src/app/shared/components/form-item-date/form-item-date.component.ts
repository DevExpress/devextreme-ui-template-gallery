import {
  Component, EventEmitter, Input, NgModule, Output, ViewChild,
} from '@angular/core';
import {
  DxCalendarModule,
  DxDropDownButtonModule,
  DxDropDownButtonComponent, DxDateBoxModule,
} from 'devextreme-angular';

import { EditViewItemModule } from 'src/app/shared/components/edit-view-item/edit-view-item.component';
import { ValueChangedEvent } from 'devextreme/ui/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-item-date',
  templateUrl: './form-item-date.component.html',
})
export class FormItemDateComponent {
  @ViewChild(DxDropDownButtonComponent) dropDownButtonComponent: DxDropDownButtonComponent;

  @Input() isEditing = false;

  @Input() dataField: string;

  @Input() text: string;

  @Input() label = '';

  @Input() value!: string | Date;

  @Output() valueChange: EventEmitter<string | Date> = new EventEmitter();

  onValueChanged = (e: ValueChangedEvent) => {
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
    EditViewItemModule,
    DxDateBoxModule,
    CommonModule,
  ],
  providers: [],
  exports: [FormItemDateComponent],
  declarations: [FormItemDateComponent],
})
export class FormItemDateModule { }
