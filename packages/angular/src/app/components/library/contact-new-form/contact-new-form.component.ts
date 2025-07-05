import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  FormTextboxComponent,
  FormPhotoUploaderComponent,
} from 'src/app/components';
import { newContact } from 'src/app/types/contact';
import { getSizeQualifier } from 'src/app/services/screen.service';

@Component({
    selector: 'contact-new-form',
    templateUrl: './contact-new-form.component.html',
    imports: [
      DxTextBoxModule,
      DxFormModule,
      DxValidatorModule,
      FormTextboxComponent,
      FormPhotoUploaderComponent,
      CommonModule,
    ]
})

export class ContactNewFormComponent {
  newUser = newContact;

  getSizeQualifier = getSizeQualifier;

  getNewContactData = ()=> ({ ...this.newUser })
}
