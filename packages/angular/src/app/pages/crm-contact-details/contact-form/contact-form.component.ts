import {
  Component, OnInit, NgModule, Input, OnDestroy, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormComponent,
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
  FormItemWithButtonModule,
  EditViewItemModule,
} from 'src/app/shared/components';
import { Observable, Subscription } from 'rxjs';
import { PhonePipeModule } from 'src/app/shared/phone.pipe';
import { Contact, contactStatusList } from 'src/app/shared/types/contact';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() contactData: Observable<Contact>;

  contactData$: Contact;

  statusList = contactStatusList;

  isEditing = false;

  isLoading = true;

  contactSubscription: Subscription = new Subscription();

  zipCodeValidator = { type: 'pattern', pattern: /^\d{5}$/, message: 'Zip is invalid' };

  validationGroup = 'contactFormValidationGroup';

  ngOnInit() {
    this.contactSubscription = this.contactData.subscribe((data) => {
      this.contactData$ = data;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

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
    FormItemWithButtonModule,
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
