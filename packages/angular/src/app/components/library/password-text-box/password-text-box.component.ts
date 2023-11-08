import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output, 
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorComponent,
  DxValidatorModule
} from 'devextreme-angular';
import { ValidationRule, EditorStyle } from 'devextreme-angular/common';
import { ApplyPipeModule } from 'src/app/pipes/apply.pipe';
import { ContactStatusModule } from 'src/app/components/utils/contact-status/contact-status.component';


@Component({
  selector: 'password-text-box',
  templateUrl: 'password-text-box.component.html',
  styles: [],
})
export class PasswordTextBoxComponent {
  @ViewChild('validator', { static: true }) validator: DxValidatorComponent;

  @Input() value: string;

  @Input() placeholder = '';

  @Input() stylingMode: EditorStyle = 'outlined';

  @Input() validators: ValidationRule[] = [];

  @Output() valueChange = new EventEmitter<string>();

  @Output() valueChanged = new EventEmitter<string>();

  isPasswordMode = true;

  constructor() {
  }

  switchMode = () => {
    this.isPasswordMode = !this.isPasswordMode;
  }

  onValueChange(value) {
    this.value = value;
    this.valueChange.emit(value);
    this.valueChanged.emit(value);
  }

  revalidate() {
    this.validator?.instance.validate();
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
