import {
  Component,
  NgModule,
  OnInit,
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
  FormItemUploaderModule,
} from 'src/app/shared/components';
import { ScreenService } from '../../../shared/services';
import { newContact } from 'src/app/shared/types/contact';
import { PhonePipeModule } from 'src/app/shared/phone.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-popup',
  templateUrl: './user-popup.component.html',
  providers: [],
})

export class UserPopupComponent implements OnInit {
  newUser = newContact;

  popupVisible = false;

  popupFullScreen = false;

  isEditing = true;

  screenSubscription: Subscription;

  constructor(private screen: ScreenService) {
    this.closePopup = this.closePopup.bind(this);
  }

  ngOnInit(): void {
    this.popupFullScreen = this.checkScreenSize();
    this.screenSubscription = this.screen.changed.subscribe(() => this.updatePopup());
  }

  checkScreenSize() {
    return this.screen.sizes['screen-small'] || this.screen.sizes['screen-x-small'];
  }

  updatePopup() {
    this.popupFullScreen = this.checkScreenSize();
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
    FormItemUploaderModule,
    CommonModule,
    PhonePipeModule,
  ],
  declarations: [UserPopupComponent],
  exports: [UserPopupComponent],
})
export class UserPopupModule { }
