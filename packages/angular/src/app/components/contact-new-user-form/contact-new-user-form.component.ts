import {
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  FormTextboxModule,
  FormPhotoUploaderModule,
} from 'src/app/components';
import { newContact } from 'src/app/types/contact';
import { getSizeQualifier } from 'src/app/services/screen.service';

@Component({
  selector: 'contact-new-user-form',
  templateUrl: './contact-new-user-form.component.html',
  providers: [],
})

export class ContactNewUserFormComponent {
  newUser = newContact;
  getSizeQualifier = getSizeQualifier;
  constructor() { }
}

@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxModule,
    FormPhotoUploaderModule,

    CommonModule,
  ],
  declarations: [ContactNewUserFormComponent],
  exports: [ContactNewUserFormComponent],
})
export class ContactNewUserFormModule { }
