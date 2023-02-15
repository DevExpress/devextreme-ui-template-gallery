import {
    Component,
    NgModule,
    Input,
    ViewChild,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import {
    DxButtonModule,
    DxToolbarModule,
    DxPopupModule,
    DxValidationGroupModule,
    DxValidationGroupComponent,
  } from 'devextreme-angular';
  import { ScreenService } from '../../services';

  @Component({
    selector: 'form-popup',
    templateUrl: './form-popup.component.html',
    providers: [],
  })

  export class FormPopupComponent {
    @ViewChild('validationGroup', { static: true }) validationGroup: DxValidationGroupComponent;

    @Input() titleText = '';

    popupVisible = false;

    constructor(protected screen: ScreenService) { }

    onCancelClick = () => {
      this.validationGroup.instance.reset();
      this.popupVisible = false;
    }

    onSaveClick = () => {
      if(!this.validationGroup.instance.validate().isValid) return;
      this.validationGroup.instance.reset();
      this.popupVisible = false;
    }
  }

  @NgModule({
    imports: [
      DxButtonModule,
      DxToolbarModule,
      DxPopupModule,
      DxValidationGroupModule,
      CommonModule,
    ],
    declarations: [FormPopupComponent],
    exports: [FormPopupComponent],
  })
  export class FormPopupModule { }
