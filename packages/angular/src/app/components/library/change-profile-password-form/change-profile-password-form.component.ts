import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { ValidationRule } from 'devextreme-angular/common';

import { PasswordTextBoxComponent } from 'src/app/components/library/password-text-box/password-text-box.component';
import { FormPopupComponent } from 'src/app/components/utils/form-popup/form-popup.component';

@Component({
  selector: 'change-profile-password-form',
  templateUrl: './change-profile-password-form.component.html',
  styleUrls: ['./change-profile-password-form.component.scss'],
  imports: [
    CommonModule,
    DxFormModule,
    DxLoadIndicatorModule,
    PasswordTextBoxComponent,
    FormPopupComponent,
  ],
})
export class ChangeProfilePasswordFormComponent {
  @ViewChild(FormPopupComponent, { static: true }) formPopup;

  @ViewChild('confirmField', { static: true }) confirmField: PasswordTextBoxComponent;

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();

  isSaveDisabled = true;

  formData: Record<string, any> = {};

  confirmPasswordValidators: ValidationRule[] = [
    {
      type: 'compare',
      message: 'Passwords do not match',
      comparisonTarget: () => this.formData.password,
    },
  ];

  async onFieldChanged() {
    const formValues = Object.entries(this.formData);

    this.isSaveDisabled =  await (formValues.length != 3 || !!formValues.find(([_, value]) => !value) || !this.formPopup.isValid());
  }

  saveNewPassword(): void {
    notify({ message: 'Password Changed', position: {at: 'bottom center', my: 'bottom center'}}, 'success');
  }

  checkConfirm(): void {
    this.confirmField.revalidate();
  }

  onNewPasswordChanged() {
    this.checkConfirm();
    this.onFieldChanged();
  }

  changeVisible(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}
