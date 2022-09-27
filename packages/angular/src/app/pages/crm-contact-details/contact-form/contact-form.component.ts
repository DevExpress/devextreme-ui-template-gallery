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
  FormItemPlainModule,
  FormItemPhotoModule,
  FormItemWithButtonModule,
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
  @ViewChild('contactForm', { static: false }) contactForm: DxFormComponent;

  @Input() contactData: Observable<Contact>;

  contactData$: Contact;

  statusList = contactStatusList;

  isEditing = false;

  isLoading = true;

  isFormValid = true;

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

  checkValidation = () => {
    this.isFormValid = this.contactForm?.instance.validate().isValid;
  };

  toggleEdit = () => {
    if (this.isEditing) {
      this.checkValidation();
    }

    this.isEditing = !this.isEditing;
  };
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
    FormItemPlainModule,
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
