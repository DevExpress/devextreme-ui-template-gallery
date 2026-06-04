import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule
} from 'devextreme-angular';
import { ValidationRule } from 'devextreme-angular/common';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';

@Component({
  selector: 'form-textbox',
  templateUrl: './form-textbox.component.html',
  styleUrls: ['form-textbox.component.scss'],
  imports: [
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule,
    CommonModule,
  ],
})
export class FormTextboxComponent {
  @Input() isEditing = false;

  @Input() text!: string;

  @Input() label = '';

  @Input() mask: string | null = null;

  @Input() icon: string | null = null;

  @Input() validators: ValidationRule[] = [{ type: 'required' }];

  @Input() value!: string;

  @Output() valueChange = new EventEmitter<string>();

  valueChanged(e: DxTextBoxTypes.ValueChangedEvent) {
    this.valueChange.emit(e.value);
  }

}
