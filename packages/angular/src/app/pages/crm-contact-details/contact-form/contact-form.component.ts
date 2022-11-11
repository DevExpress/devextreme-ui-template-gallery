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
  DxValidatorModule,
} from 'devextreme-angular';
import {
  ContactStatusModule,
  FormTextboxModule,
  FormPhotoModule,
} from 'src/app/shared/components';
import { Contact, contactStatusList } from 'src/app/shared/types/contact';
import { ValidationRule } from 'devextreme/ui/validation_rules';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() contactData: Contact;

  statusList = contactStatusList;

  isEditing = false;

  zipCodeValidator: ValidationRule[] = [{ type: 'pattern', pattern: /^\d{5}$/, message: 'Zip is invalid' }];

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

    FormTextboxModule,
    ContactStatusModule,
    FormPhotoModule,
    DxValidatorModule,
    CommonModule,
  ],
  providers: [],
  exports: [ContactFormComponent],
  declarations: [ContactFormComponent],
})
export class ContactFormModule { }
