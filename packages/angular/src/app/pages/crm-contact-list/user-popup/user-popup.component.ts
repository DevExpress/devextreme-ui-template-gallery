import {
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxFormModule,
  DxValidatorModule,
  DxPopupModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  ContactStatusModule,
  FormTextboxModule,
  FormItemPhotoModule,
} from 'src/app/shared/components';
import { newContact } from 'src/app/shared/types/contact';
import { PhonePipeModule } from 'src/app/shared/phone.pipe';

@Component({
  selector: 'user-popup',
  templateUrl: './user-popup.component.html',
  providers: [],
})

export class UserPopupComponent {
  newUser = newContact;

  popupVisible = false;

  isEditing = true;

  constructor() {
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.popupVisible = false;
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxFormModule,
    DxValidatorModule,
    DxPopupModule,

    FormTextboxModule,
    CardActivitiesModule,
    ContactStatusModule,
    FormItemPhotoModule,
    CommonModule,
    PhonePipeModule,
  ],
  declarations: [UserPopupComponent],
  exports: [UserPopupComponent],
})
export class UserPopupModule { }
