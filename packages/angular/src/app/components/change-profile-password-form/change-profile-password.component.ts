import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, OnInit, Output, ViewChild} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ValidationCallbackData, ValidationRule } from 'devextreme/ui/validation_rules';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxTextBoxModule, DxValidatorModule } from "devextreme-angular";
import { ApplyPipeModule } from "../../pipes/apply.pipe";
import {FormPopupComponent, FormPopupModule} from "../form-popup/form-popup.component";
import notify from "devextreme/ui/notify";

@Component({
  selector: 'change-profile-password-form',
  templateUrl: './change-profile-password.component.html',
  styles: [`
    @use "../../../variables" as *;
    @include separator();

    dx-form {
      padding: 0 8px;
    }
  `]
})
export class ChangeProfilePasswordComponent implements OnInit {
  @ViewChild('popup', { static: true }) popup: FormPopupComponent;

  @Input() opener = new EventEmitter();

  @Output() hide = new EventEmitter();

  formData: Record<string, any> = {};

  visible = false;

  fields = [
    {
      label: 'Current Password',
      name: 'currentPassword'
    },
    {
      label: 'Password',
      name: 'password'
    },
    {
      label: 'Confirm Password',
      name: 'confirmedPassword',
      validators: [
        { type: 'custom',
          message: 'Passwords do not match',
          validationCallback: (e: ValidationCallbackData) => e.value === this.formData.password
        }]
    }];

  ngOnInit() {
    this.opener.subscribe((isOpen) => {
      this.visible = isOpen
    })
  }

  saveNewPassword() {
    notify('Password Changed', 'success');
  }

  concat = (target: ValidationRule[], other: ValidationRule[] = []) => target.concat(other);
}
@NgModule({
  imports: [
    ApplyPipeModule,
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxTextBoxModule,
    DxValidatorModule,
    FormPopupModule,
  ],
  declarations: [ChangeProfilePasswordComponent],
  exports: [ChangeProfilePasswordComponent],
})
export class ChangeProfilePasswordFormModule { }
