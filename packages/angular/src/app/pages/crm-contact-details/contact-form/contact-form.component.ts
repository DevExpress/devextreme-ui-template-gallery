import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  ContactStatusModule,
  FormItemPhotoModule,
  EditViewItemModule,
} from 'src/app/shared/components';
import { PhonePipeModule } from 'src/app/shared/phone.pipe';
import { Contact, contactStatusList } from 'src/app/shared/types/contact';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() contactData: Contact;

  statusList = contactStatusList;

  isEditing = false;

  zipCodeValidator = { type: 'pattern', pattern: /^\d{5}$/, message: 'Zip is invalid' };

  validationGroup = 'contactFormValidationGroup';

  handleEditClick() {
    this.isEditing = true;
  }

  handleSaveClick() {
    this.isEditing = false;
  }

  handleCancelClick() {
    this.isEditing = false;
  }
}

@NgModule({
  imports: [
    DxToolbarModule,
    DxFormModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxLoadPanelModule,

    ContactStatusModule,
    EditViewItemModule,
    FormItemPhotoModule,
    DxValidatorModule,
    CommonModule,
    PhonePipeModule,
    DxValidationGroupModule,
  ],
  providers: [],
  exports: [ContactFormComponent],
  declarations: [ContactFormComponent],
})
export class ContactFormModule { }
