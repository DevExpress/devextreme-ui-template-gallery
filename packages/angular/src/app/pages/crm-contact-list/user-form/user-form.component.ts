import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  ContactStatusModule,
  FormTextboxModule,
  FormItemPhotoModule,
  FormItemUploaderModule,
} from 'src/app/shared/components';
import { Contact } from 'src/app/shared/types/contact';
import { PhonePipeModule } from 'src/app/shared/phone.pipe';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  providers: [],
})

export class UserFormComponent {
  @Input() user: Contact;

  @Input() contentByScreen: { xs: number, sm: number };

  isEditing = false;

  constructor() { }
}

@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxModule,
    CardActivitiesModule,
    ContactStatusModule,
    FormItemPhotoModule,
    FormItemUploaderModule,

    CommonModule,
    PhonePipeModule,
  ],
  declarations: [UserFormComponent],
  exports: [UserFormComponent],
})
export class UserFormModule { }
