import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { ValidationRule } from 'devextreme/ui/validation_rules';
import { ApplyPipeModule } from '../../pipes/apply.pipe';
import { ContactStatusModule } from '../contact-status/contact-status.component';

@Component({
  selector: 'password-text-box',
  templateUrl: 'password-text-box.component.html',
  styles: [],
})
export class PasswordTextBoxComponent {
  @Input() value: string;

  @Input() placeholder = '';

  @Input() stylingMode = 'outlined';

  @Input() validators: ValidationRule[] = [];

  @Output() valueChange = new EventEmitter<string>();

  isPasswordMode = true;

  switchMode = () => {
    this.isPasswordMode = !this.isPasswordMode;
  }
}

@NgModule({
  imports: [
    ApplyPipeModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    ContactStatusModule,
    DxValidatorModule,
    CommonModule],
  declarations: [PasswordTextBoxComponent],
  exports: [PasswordTextBoxComponent],
})
export class PasswordTextBoxModule {}
