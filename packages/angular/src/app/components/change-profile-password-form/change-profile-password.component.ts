import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { FormPopupComponent, FormPopupModule } from '../form-popup/form-popup.component';
import notify from 'devextreme/ui/notify';
import { PasswordTextBoxModule } from "../password-text-box/password-text-box.component";

@Component({
  selector: 'change-profile-password-form',
  templateUrl: './change-profile-password.component.html',
  styles: [`
    @use "../../../variables" as *;
    @include separator();

    dx-form {
      padding: 0 8px;
    }

    ::ng-deep .change-profile-password-popup .dx-popup-normal {
      border-radius: 8px;
      padding: 8px 0;

      .dx-toolbar {
        padding: 0 24px 8px;
      }
    }
  `]
})
export class ChangeProfilePasswordComponent {
  @ViewChild('popup', { static: true }) popup: FormPopupComponent;

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter();

  formData: Record<string, any> = {};


  fields:Record<string, any>[] = [
    {
      label: 'Current Password',
      name: 'currentPassword',
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

  saveNewPassword() {
    notify('Password Changed', 'success');
  }

  changeVisible(visible) {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}
@NgModule({
  imports: [
    CommonModule,
    DxFormModule,
    DxLoadIndicatorModule,
    PasswordTextBoxModule,
    FormPopupModule,
  ],
  declarations: [ChangeProfilePasswordComponent],
  exports: [ChangeProfilePasswordComponent],
})
export class ChangeProfilePasswordFormModule { }
