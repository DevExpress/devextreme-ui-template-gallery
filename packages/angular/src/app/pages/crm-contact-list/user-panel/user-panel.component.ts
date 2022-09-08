import {
  Component, OnInit, OnChanges, OnDestroy, NgModule, Output, Input, SimpleChanges, EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  DxAccordionModule,
  DxButtonModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxLoadPanelModule,
  DxScrollViewModule,
  DxFormModule,
} from 'devextreme-angular';
import { ClickEvent as ButtonClickEvent } from 'devextreme/ui/button';
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
export class UserPanelComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen = false;

  @Input() userId: number;

  @Output() isOpenChange = new EventEmitter<boolean>();

  user: Contact;

  isLoading = true;

  isEditing = false;

  isPin = false;

  isPinEnabled = false;

  stylingMode = 'underlined';

  editorOptions = { stylingMode: this.stylingMode };

  userPanelSubscriptions: Subscription[] = [];

  constructor(private screen: ScreenService, private service: RwaService, private router: Router) {
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
    this.userPanelSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadUserById = (id: number) => {
    this.isLoading = true;
    this.userPanelSubscriptions.push(this.service.getContact(id).subscribe((data) => {
      this.user = data;
      this.isLoading = false;
    }));
  };

  closePanel = () => {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  };

  pinClick = () => {
    this.isPin = !this.isPin;
  };

  calculatePin = () => {
    this.isPinEnabled = this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'];
    if (this.isPin && !this.isPinEnabled) {
      this.isPin = false;
    }
  };

  accordionTitleClick = (e: ButtonClickEvent) => {
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

  navigateToDetails = () => {
    this.router.navigate(['/crm-contact-details']);
  }
}

@NgModule({
  imports: [
    DxAccordionModule,
    DxButtonModule,
    DxDropDownButtonModule,
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
