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
  FormItemBlueModule,
  FormItemPhotoModule,
} from 'src/app/shared/components';
import { Observable, Subscription } from 'rxjs';
import { Contact, contactStatusList } from 'src/app/shared/types/contact';

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() contact: Observable<Contact>;

  contact$: Contact;

  statusList = contactStatusList.slice(1);

  isEditing: boolean = false;

  isLoading: boolean = true;

  stylingMode: TextBoxProperties['stylingMode'] = 'underlined';

  editorOptions: TextBoxProperties = { stylingMode: this.stylingMode };

  contactSubscription: Subscription = new Subscription();  

  constructor() {
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
    FormItemBlueModule,
    FormItemPhotoModule,

    CommonModule,
  ],
  providers: [],
  exports: [ContactFormComponent],
  declarations: [ContactFormComponent],
})
export class ContactFormModule { }
