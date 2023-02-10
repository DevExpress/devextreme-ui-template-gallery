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
import { ScreenService } from '../../services';

@Component({
  selector: 'contact-new-user-form',
  templateUrl: './contact-new-user-form.component.html',
  providers: [],
})

export class ContactNewUserFormComponent {
  newUser = newContact;

  constructor(protected screen: ScreenService) { }
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
