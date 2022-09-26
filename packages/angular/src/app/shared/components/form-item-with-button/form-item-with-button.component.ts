import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import {
  DxButtonModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { Properties as DxTextBoxOptions } from 'devextreme/ui/text_box';
import { Properties as DxButtonOptions } from 'devextreme/ui/button';

@Component({
  selector: 'form-item-with-button',
  templateUrl: './form-item-with-button.component.html',
  styles: [`
  .dx-button {
    margin-top: 10px;
  }
  `],
})
export class FormItemWithButtonComponent {
  @Input() value: string;

  @Output() valueChange = new EventEmitter();

  @Input() textBoxOptions?: DxTextBoxOptions = {};

  @Input() buttonOptions?: DxButtonOptions = {};

  @Input() isEditing? = true;
}

@NgModule({
  imports: [
    DxButtonModule,
    DxTextBoxModule,

    CommonModule,
  ],
  declarations: [FormItemWithButtonComponent],
  exports: [FormItemWithButtonComponent],
})
export class FormItemWithButtonModule { }
