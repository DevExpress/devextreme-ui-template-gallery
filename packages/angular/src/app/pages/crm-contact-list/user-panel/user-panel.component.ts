import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  NgModule,
  Output,
  Input,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  DxAccordionModule,
  DxButtonModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxLoadPanelModule,
  DxScrollViewModule,
  DxFormModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { ClickEvent as ButtonClickEvent } from 'devextreme/ui/button';
import {
  FormTextboxModule,
  FormPhotoModule,
  CardActivitiesModule,
  ContactStatusModule,
} from 'src/app/shared/components';
import { ScreenService, DataService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/shared/types/contact';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  providers: [DataService],
})
export class UserPanelComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpened = false;

  @Input() userId: number;

  @Output() isOpenedChange = new EventEmitter<boolean>();

  user: Contact;

  isLoading = true;

  isEditing = false;

  isPinned = false;

  isPinEnabled = false;

  userPanelSubscriptions: Subscription[] = [];

  constructor(private screen: ScreenService, private service: DataService, private router: Router) {
    this.userPanelSubscriptions.push(this.screen.changed.subscribe(this.calculatePin.bind(this)));
  }

  ngOnInit(): void {
    this.calculatePin();
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
      this.isEditing = false;
    }));
  };

  onClosePanel = () => {
    this.isOpened = false;
    this.isOpenedChange.emit(this.isOpened);
  };

  onPinClick = () => {
    this.isPinned = !this.isPinned;
  };

  onSaveClick = ({ validationGroup } : ButtonClickEvent) => {
    if (!validationGroup.validate().isValid) return;
    this.isEditing = !this.isEditing;
  }

  calculatePin = () => {
    this.isPinEnabled = this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'];
    if (this.isPinned && !this.isPinEnabled) {
      this.isPinned = false;
    }
  };

  accordionTitleClick = (e: ButtonClickEvent) => {
    e.event.stopPropagation();
  };

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
  };

  navigateToDetails = () => {
    this.router.navigate(['/crm-contact-details']);
  };
}

@NgModule({
  imports: [
    DxAccordionModule,
    DxButtonModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxFormModule,
    DxValidatorModule,
    DxValidationGroupModule,

    FormTextboxModule,
    FormPhotoModule,
    CardActivitiesModule,
    ContactStatusModule,
    CommonModule,
  ],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule { }
