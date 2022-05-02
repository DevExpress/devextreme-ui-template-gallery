import {
  Component, OnInit, NgModule, Output, Input, SimpleChanges, EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxAccordionModule,
  DxButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxLoadPanelModule,
  DxScrollViewModule,
  DxFormModule,
} from 'devextreme-angular';
import { Properties as TextBoxProperties } from 'devextreme/ui/text_box'; 
import {
  CardActivitiesModule,
  ContactStatusModule,
  FormItemBlueModule,
  FormItemPhotoModule,
} from 'src/app/shared/components';
import { ScreenService, RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/shared/types/contact';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  providers: [RwaService],
})
export class UserPanelComponent implements OnInit {
  @Input() isOpen!: boolean;

  @Input() userId: number;

  @Output() isOpenChange = new EventEmitter<boolean>();

  user: Contact;

  isPin: boolean;

  isLoading: boolean;

  isPinEnabled: boolean;

  isEditing: boolean;

  stylingMode: TextBoxProperties['stylingMode'];

  editorOptions: TextBoxProperties;

  userPanelSubscriptions: Subscription[];

  constructor(private screen: ScreenService, private service: RwaService) {
    this.isLoading = true;
    this.isEditing = false;

    this.isPin = false;
    this.isPinEnabled = false;

    this.userPanelSubscriptions = [];
    
    this.pinClick = this.pinClick.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.customizePhoneCell = this.customizePhoneCell.bind(this);

    this.userPanelSubscriptions.push(this.screen.changed.subscribe(this.calculatePin.bind(this)));
  }

  ngOnInit(): void {
    this.calculatePin();
    this.setEditorMode(this.isEditing);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { userId } = changes;

    if (userId?.currentValue) {
      this.loadUserById(userId.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.userPanelSubscriptions.forEach(sub => sub.unsubscribe());
  }

  loadUserById = (id: number) => {
    this.isLoading = true;
    this.userPanelSubscriptions.push(this.service.getContact(id).subscribe((data) => {
      this.user = data;
      this.isLoading = false;
    }));
  };

  closePanel() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  pinClick() {
    this.isPin = !this.isPin;
  }

  calculatePin = () => {
    this.isPinEnabled = this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'];
    if (this.isPin && !this.isPinEnabled) {
      this.isPin = false;
    }
  };

  formatPhone = (number: string | number): string =>
    String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');

  customizePhoneCell = (cellInfo): string =>
    this.formatPhone(cellInfo.value);

  accordionTitleClick = (e) => {
    e.event.stopPropagation();
  };

  setEditorMode = (isEditing: boolean) => {
    this.stylingMode = isEditing ? 'filled' : 'underlined';
    this.editorOptions = {
      stylingMode: this.stylingMode,
    };
  };

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
    this.setEditorMode(this.isEditing);
  };
}

@NgModule({
  imports: [
    DxAccordionModule,
    DxButtonModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxFormModule,

    CardActivitiesModule,
    ContactStatusModule,
    FormItemBlueModule,
    FormItemPhotoModule,

    CommonModule,
  ],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule { }
