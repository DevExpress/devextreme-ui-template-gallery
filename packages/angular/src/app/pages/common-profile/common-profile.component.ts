import {
  Component, EventEmitter, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import notify from 'devextreme/ui/notify';
import {
  DxButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxFormModule,
  DxNumberBoxModule,
  DxDateBoxModule,
} from 'devextreme-angular';
import { forkJoin } from 'rxjs';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';
import {
  FormPhotoModule,
  FormTextboxModule,
  ChangeProfilePasswordFormModule,
  ProfileCardModule,
  FormPopupModule,
} from 'src/app/components';
import { DataService } from 'src/app/services';

@Component({
  templateUrl: './common-profile.component.html',
  styleUrls: ['./common-profile.component.scss'],
  providers: [DataService],
})
export class CommonProfileComponent {
  profileId = 22;

  profileData: Record<string, any>;

  isLoading = true;

  supervisorsList = [];

  changePasswordPopupOpener = new EventEmitter<boolean>();

  isDataChanged = false;

  basicInfoItems: Record<string, any>[] = this.getBasicInfoItems();

  contactItems: Record<string, any>[] = this.getContactItems();

  addressItems: Record<string, any>[] = this.getAddressItems();

  constructor(private service: DataService) {
    forkJoin([
      service.getSupervisors(),
      service.getProfile(this.profileId)
    ]).subscribe(([supervisorsList, profileData]) => {
      this.supervisorsList.length = 0;
      this.supervisorsList.push(...supervisorsList);
      this.profileData = profileData;
      this.isLoading = false;
    });
  }

  getBasicInfoItems(){
    return [
      { dataField: 'firstName', colSpan: 2 },
      { dataField: 'lastName', colSpan: 2 },
      {
        dataField: 'gender',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items:['male', 'female'],
        }
      },
      {
        dataField: 'birthDate',
        colSpan: 2,
        editorType: 'dxDateBox',
      },
      {
        dataField: 'department',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['UI/UX', 'Backend Developers'],
        }
      },
      {
        dataField: 'position',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['Designer', 'Developer', 'Technical Writer'],
        }
      },
      {
        dataField: 'hiredDate',
        editorType: 'dxDateBox',
        colSpan: 2,
      },
    ]
  }

  getContactItems() {
    return [
      {dataField: 'phone',
        editorOptions: {
          mask: '+1(000)000-0000',
        }},
      { dataField: 'email' },
      {
        dataField: 'domainUsername',
        colSpan: 2, },
      {
        dataField: 'status',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items: ['Salaried'],
        }
      },
      {
        dataField: 'supervisor',
        label: 'Supervisor',
        colSpan: 2,
        itemsList: this.supervisorsList,
        editorType: 'dxSelectBox',
      },
    ];
  }

  getAddressItems() {
    return   [
      { dataField: 'country' },
      { dataField: 'city' },
      {
        dataField: 'state',
        colSpan: 2,
        label: 'State/province/area',
        editorOptions: {
          label: 'State/province/area',
        }},
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
    this.isDataChanged = true;
  }

  copyToClipboard(text) {
    window.navigator.clipboard?.writeText(text)
  };

  changePassword() {
    this.changePasswordPopupOpener.emit(true);
  };

  save() {
    notify('Data saved', 'success');
    this.isDataChanged = false;
  }

}

@NgModule({
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
    FormTextboxModule,
    FormPhotoModule,
    FormPopupModule,
    ProfileCardModule,
    ChangeProfilePasswordFormModule,
    CommonModule,
    PhonePipeModule,
  ],
  providers: [],
  exports: [],
  declarations: [CommonProfileComponent],
})
export class CommonProfileListModule { }
