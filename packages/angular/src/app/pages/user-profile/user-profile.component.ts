import {
  Component,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import notify from 'devextreme/ui/notify';
import {
  DxButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxFormModule,
  DxNumberBoxModule,
  DxDateBoxModule,
  DxLoadPanelModule,
  DxFileUploaderModule,
  DxScrollViewModule,
} from 'devextreme-angular';

import { PhonePipeDirective } from 'src/app/pipes/phone.pipe';
import {
  FormPhotoComponent,
  ChangeProfilePasswordFormComponent,
  ProfileCardComponent,
} from 'src/app/components';
import { DataService, ScreenService } from 'src/app/services';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DataService],
  imports: [
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxFileUploaderModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    FormPhotoComponent,
    ProfileCardComponent,
    ChangeProfilePasswordFormComponent,
    CommonModule,
    PhonePipeDirective,
  ],
})
export class UserProfileComponent {
  private service = inject(DataService);

  protected screen = inject(ScreenService);

  profileId = 22;

  profileData = signal<Record<string, any> | undefined>(undefined);

  savedProfileData = signal<Record<string, any> | undefined>(undefined);

  isLoading = signal(true);

  supervisorsList = signal<unknown[]>([]);

  isChangePasswordPopupOpened = model(false);

  isDataChanged = signal(false);

  isContentScrolled = signal(false);

  basicInfoItems: Record<string, any>[] = this.getBasicInfoItems();

  contactItems = computed(() => this.getContactItems(this.supervisorsList()));

  addressItems: Record<string, any>[] = this.getAddressItems();

  constructor() {
    forkJoin([
      this.service.getSupervisors(),
      this.service.getProfile(this.profileId),
    ]).subscribe(([supervisorsList, profileData]) => {
      this.supervisorsList.set(supervisorsList as unknown[]);
      this.profileData.set(profileData as Record<string, any>);
      this.setSavedData();
      this.isLoading.set(false);
    });
  }

  getBasicInfoItems() {
    return [
      { dataField: 'firstName', colSpan: 2 },
      { dataField: 'lastName', colSpan: 2 },
      {
        dataField: 'department',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['UI/UX', 'Backend Developers'],
        },
      },
      {
        dataField: 'position',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['Designer', 'Developer', 'Technical Writer'],
        },
      },
      {
        dataField: 'hiredDate',
        editorType: 'dxDateBox',
        colSpan: 1,
        editorOptions: {
          max: new Date(),
        },
      },
      {
        dataField: 'birthDate',
        colSpan: 1,
        editorType: 'dxDateBox',
        editorOptions: {
          max: new Date(),
        },
      },
    ];
  }

  getContactItems(supervisorsList: unknown[]) {
    return [
      {
        dataField: 'phone',
        editorOptions: {
          mask: '(000) 000-0000',
        },
      },
      {
        dataField: 'email',
        validators: [{ type: 'email' }],
      },
      {
        dataField: 'domainUsername',
        colSpan: 2,
      },
      {
        dataField: 'status',
        colSpan: 2,
      },
      {
        dataField: 'supervisor',
        label: 'Supervisor',
        colSpan: 2,
        itemsList: supervisorsList,
        editorType: 'dxSelectBox',
      },
    ];
  }

  getAddressItems() {
    return [
      { dataField: 'country' },
      { dataField: 'city' },
      {
        dataField: 'state',
        colSpan: 2,
        label: 'State/province/area',
        editorOptions: {
          label: 'State/province/area',
        },
      },
      {
        dataField: 'address',
        colSpan: 2,
      },
      {
        dataField: 'zipCode',
        editorType: 'dxNumberBox',
        colSpan: 2,
      },
    ];
  }

  dataChanged() {
    this.isDataChanged.set(true);
  }

  setSavedData(data?: Record<string, any>) {
    const source = data ?? this.profileData();
    if (source) {
      this.savedProfileData.set(JSON.parse(JSON.stringify(source)));
    }
  }

  copyToClipboard(text, evt) {
    window.navigator.clipboard?.writeText(text);
    const tipText = 'Text copied';
    notify(
      {
        message: tipText,
        minWidth: `${tipText.length + 2}ch`,
        width: 'auto',
        position: { of: evt.target, offset: '0 -30' },
      },
      'info',
      500
    );
  }

  changePassword() {
    this.isChangePasswordPopupOpened.set(true);
  }

  cancel() {
    const saved = this.savedProfileData();
    if (saved) {
      this.profileData.set(JSON.parse(JSON.stringify(saved)));
    }
    this.setSavedData();
    this.isDataChanged.set(false);
  }

  save() {
    notify(
      {
        message: 'Data saved',
        position: { at: 'bottom center', my: 'bottom center' },
      },
      'success'
    );
    this.isDataChanged.set(false);
    this.setSavedData();
  }

  scroll({ reachedTop = false }) {
    this.isContentScrolled.set(!reachedTop);
  }
}
