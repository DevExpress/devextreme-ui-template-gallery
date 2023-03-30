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
import {ApplyPipeModule} from "../../pipes/apply.pipe";

  @Component({
    selector: 'form-popup',
    templateUrl: './form-popup.component.html',
    providers: [],
    styleUrls: ['./form-popup.component.scss']
  })

  export class FormPopupComponent {
    @ViewChild('validationGroup', { static: true }) validationGroup: DxValidationGroupComponent;

    @Input() titleText = '';

    @Input() width = 480;

    @Input() wrapperAttr: Record<string, string> = {};

    @Input() visible = false;

    @Output() save = new EventEmitter();

    @Output() visibleChange = new EventEmitter();

    constructor(protected screen: ScreenService) { }

    onCancelClick = () => {
      this.close();
    }

    onSaveClick = () => {
      if(!this.validationGroup.instance.validate().isValid) return;
      this.save.emit();
      this.close();
    }

    close = () => {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.validationGroup.instance.reset();
    }
  }

  @NgModule({
    imports: [
      ApplyPipeModule,
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
