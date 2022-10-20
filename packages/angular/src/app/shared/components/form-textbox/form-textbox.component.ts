import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule
} from "devextreme-angular";

@Component({
  selector: 'form-textbox',
  templateUrl: './form-textbox.component.html',
  styleUrls: ['form-textbox.component.scss'],
})
export class FormTextboxComponent {
  @Input() isEditing = false;

  @Input() text: string;

  @Input() label = '';

  @Input() mask: string = null;

  @Input() icon: string = null;

  @Input() validationGroup: string = undefined;

  @Input() validators: any[] = [];

  @Input() value!: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

}

@NgModule({
  imports: [
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule,
    CommonModule,
  ],
  declarations: [FormTextboxComponent],
  exports: [FormTextboxComponent],
})
export class FormTextboxModule { }
