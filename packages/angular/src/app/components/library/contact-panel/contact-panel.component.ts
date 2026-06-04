import {
  Component,
  effect,
  inject,
  model,
  OnDestroy,
  OnInit,
  output,
  input,
  signal,
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
  FormTextboxComponent,
  FormPhotoComponent,
  ContactStatusComponent,
  CardActivitiesComponent,
} from 'src/app/components';
import { ScreenService, DataService } from 'src/app/services';
import { Subscription } from 'rxjs';
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
    FormTextboxComponent,
    FormPhotoComponent,
    CardActivitiesComponent,
    ContactStatusComponent,
    CommonModule,
  ]
})
export class ContactPanelComponent implements OnInit, OnDestroy {
  isOpened = model(false);

  userId = input<number>();

  pinnedChange = output<boolean>();

  private screen = inject(ScreenService);

  private service = inject(DataService);

  private router = inject(Router);

  formData = signal<Contact | undefined>(undefined);

  contactData = signal<Contact | undefined>(undefined);

  pinned = signal(false);

  isLoading = signal(true);

  isEditing = signal(false);

  isPinEnabled = signal(false);

  userPanelSubscriptions: Subscription[] = [];

  constructor() {
    this.userPanelSubscriptions.push(
      this.screen.changed.subscribe(this.calculatePin),
    );

    effect(() => {
      const id = this.userId();
      if (id) {
        this.loadUserById(id);
      }
    });
  }

  private emitPinnedChange(): void {
    this.pinnedChange.emit(this.pinned());
  }

  ngOnInit(): void {
    this.calculatePin();
  }

  ngOnDestroy(): void {
    this.userPanelSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadUserById = (id: number) => {
    this.isLoading.set(true);

    this.service.getContact(id).subscribe((data) => {
      this.formData.set(data);
      this.contactData.set({ ...data });
      this.isLoading.set(false);
      this.isEditing.set(false);
    });
  };

  onClosePanel = () => {
    const wasPinned = this.pinned();
    this.isOpened.set(false);
    this.pinned.set(false);
    if (wasPinned) {
      this.emitPinnedChange();
    }
  };

  onPinClick = () => {
    this.pinned.update((value) => !value);
    this.emitPinnedChange();
  };

  onSaveClick = ({ validationGroup }: DxButtonTypes.ClickEvent) => {
    if (!validationGroup.validate().isValid) return;
    const form = this.formData();
    if (form) {
      this.contactData.set({ ...form });
    }
    this.isEditing.update((value) => !value);
  };

  calculatePin = () => {
    this.isPinEnabled.set(
      this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium']
    );
    if (this.pinned() && !this.isPinEnabled()) {
      this.pinned.set(false);
      this.emitPinnedChange();
    }
  };

  toggleEdit = () => {
    this.isEditing.update((value) => !value);
  };

  cancelHandler() {
    this.toggleEdit();
    const saved = this.contactData();
    if (saved) {
      this.formData.set({ ...saved });
    }
  }

  navigateToDetails = () => {
    const contact = this.contactData();
    if (contact) {
      this.router.navigate(['/crm-contact-details'], {
        queryParams: { id: contact.id },
      });
    }
  };
}
