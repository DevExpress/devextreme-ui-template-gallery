import {
 Component, OnInit, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxToolbarModule,
  DxFormModule,
  DxSelectBoxModule,
  DxButtonModule,
  DxTextBoxModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { Properties as TextBoxProperties } from 'devextreme/ui/text_box';
import { Observable, Subscription } from 'rxjs';
import {
  ContactStatusModule,
  FormItemBlueModule,
  FormItemPhotoModule,
} from 'src/app/shared/components';
import { Contact, contactStatusList } from 'src/app/shared/types/contact';

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Observable<Contact>;

  contact$: Contact;

  contactSubscription: Subscription;

  statusList = contactStatusList.slice(1);

  isEditing: boolean;

  isLoading: boolean;

  stylingMode: TextBoxProperties['stylingMode'];

  editorOptions: TextBoxProperties;

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
    this.setEditorMode(this.isEditing);
  };

  constructor() {
    this.editorOptions = { };

    this.isEditing = false;
    this.isLoading = true;
  }

  ngOnInit() {
    this.setEditorMode(this.isEditing);

    this.contactSubscription = this.contact.subscribe((data) => {
      this.contact$ = data;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

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
    FormItemBlueModule,
    FormItemPhotoModule,

    CommonModule,
  ],
  providers: [],
  exports: [ContactFormComponent],
  declarations: [ContactFormComponent],
})
export class ContactFormModule { }
