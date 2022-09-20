import {
  Component, OnInit, NgModule, Input, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { Properties as TextBoxProperties } from 'devextreme/ui/text_box';
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
  @Input() contactData: Observable<Contact>;

  contactData$: Contact;

  statusList = contactStatusList;

  isEditing = false;

  isLoading = true;

  stylingMode = 'underlined';

  editorOptions = { stylingMode: this.stylingMode };

  contactSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.setEditorMode(this.isEditing);

    this.contactSubscription = this.contactData.subscribe((data) => {
      this.contactData$ = data;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
    this.setEditorMode(this.isEditing);
  };

  setEditorMode = (isEditing: boolean) => {
    this.stylingMode = isEditing ? 'filled' : 'underlined';
    this.editorOptions = {
      stylingMode: this.stylingMode,
    };
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

    CommonModule,
    PhonePipeModule,
  ],
  providers: [],
  exports: [ContactFormComponent],
  declarations: [ContactFormComponent],
})
export class ContactFormModule { }
