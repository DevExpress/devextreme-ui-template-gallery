import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  Input,
  SimpleChanges,
  EventEmitter,
  AfterViewChecked,
  inject,
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
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import {
  FormTextboxModule,
  FormPhotoComponent,
  ContactStatusComponent,
  CardActivitiesComponent,
} from 'src/app/components';
import { ScreenService, DataService } from 'src/app/services';
import { distinctUntilChanged, Subject, Subscription} from 'rxjs';
import { Contact } from 'src/app/types/contact';

@Component({
    selector: 'contact-panel',
    templateUrl: './contact-panel.component.html',
    styleUrls: ['./contact-panel.component.scss'],
    providers: [DataService],
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
      FormPhotoComponent,
      CardActivitiesComponent,
      ContactStatusComponent,
      CommonModule,
    ]
})
export class ContactPanelComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  @Input() isOpened = false;

  @Input() userId: number;

  @Output() isOpenedChange = new EventEmitter<boolean>();

  @Output() pinnedChange = new EventEmitter<boolean>();

  private pinEventSubject = new Subject<boolean>();

  formData: Contact;

  contactData: Contact;

  pinned = false;

  isLoading = true;

  isEditing = false;

  isPinEnabled = false;

  userPanelSubscriptions: Subscription[] = [];

  private screen = inject(ScreenService);
  private service = inject(DataService);
  private router = inject(Router);

  constructor() {
    this.userPanelSubscriptions.push(
      this.screen.changed.subscribe(this.calculatePin),
      this
        .pinEventSubject
        .pipe(distinctUntilChanged())
        .subscribe(this.pinnedChange)
    );
  }

  ngOnInit(): void {
    this.calculatePin();
  }

  ngAfterViewChecked(): void {
    this.pinEventSubject.next(this.pinned);
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

    this.service.getContact(id).subscribe((data) => {
      this.formData = data;
      this.contactData = { ...this.formData };
      this.isLoading = false;
      this.isEditing = false;
    })
  };

  onClosePanel = () => {
    this.isOpened = false;
    this.pinned = false;
    this.isOpenedChange.emit(this.isOpened);
  };

  onPinClick = () => {
    this.pinned = !this.pinned;
  };

  onSaveClick = ({ validationGroup } : DxButtonTypes.ClickEvent) => {
    if (!validationGroup.validate().isValid) return;
    this.contactData = { ...this.formData };
    this.isEditing = !this.isEditing;
  }

  calculatePin = () => {
    this.isPinEnabled = this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'];
    if (this.pinned && !this.isPinEnabled) {
      this.pinned = false;
    }
  };

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
  };

  cancelHandler() {
    this.toggleEdit();
    this.formData = { ...this.contactData };
  }

  navigateToDetails = () => {
    this.router.navigate(['/crm-contact-details']);
  };
}
