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
} from 'src/app/shared/components';
import { newContact } from 'src/app/shared/types/contact';

@Component({
  selector: 'user-new-form',
  templateUrl: './user-new-form.component.html',
  providers: [],
})

export class UserNewFormComponent {
  newUser = newContact;

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
  declarations: [UserNewFormComponent],
  exports: [UserNewFormComponent],
})
export class UserNewFormModule { }
