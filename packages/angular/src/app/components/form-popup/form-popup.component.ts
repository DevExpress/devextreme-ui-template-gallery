import {
  Component,
  NgModule,
  Input,
  ViewChild, Output, EventEmitter,
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

    @Input() width = 480;

    @Input() wrapperAttr: Record<string, string> = {};

    @Input() visible = false;

    @Output() save = new EventEmitter();

    @Output() hide = new EventEmitter();



    constructor(protected screen: ScreenService) { }

    onCancelClick = () => {
      this.validationGroup.instance.reset();
      this.visible = false;
      this.hide.emit();
    }

    onSaveClick = () => {
      if(!this.validationGroup.instance.validate().isValid) return;
      this.visible = false;
      this.save.emit();
      this.hide.emit();
      this.validationGroup.instance.reset();
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
