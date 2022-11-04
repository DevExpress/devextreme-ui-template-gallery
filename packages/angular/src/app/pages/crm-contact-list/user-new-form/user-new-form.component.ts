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
  FormItemUploaderModule,
} from 'src/app/shared/components';
import { newContact } from 'src/app/shared/types/contact';
import { PhonePipeModule } from 'src/app/shared/phone.pipe';

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
    FormItemUploaderModule,

    CommonModule,
    PhonePipeModule,
  ],
  declarations: [UserNewFormComponent],
  exports: [UserNewFormComponent],
})
export class UserNewFormModule { }
