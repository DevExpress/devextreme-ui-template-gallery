import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxToolbarModule,
  DxPopupModule,
  DxValidationGroupModule,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { ScreenService } from 'src/app/services';
import { ApplyPipeDirective } from 'src/app/pipes/apply.pipe';

@Component({
    selector: 'form-popup',
    templateUrl: './form-popup.component.html',
    styleUrls: ['./form-popup.component.scss'],
    imports: [
      ApplyPipeDirective,
      DxButtonModule,
      DxToolbarModule,
      DxPopupModule,
      DxValidationGroupModule,
      CommonModule,
    ],
})

export class FormPopupComponent {
  @ViewChild('validationGroup', { static: true }) validationGroup: DxValidationGroupComponent;

  @Input() titleText = '';

  @Input() width = 480;

  @Input() height: string | number = 'auto';

  @Input() wrapperAttr: Record<string, string> = {};

  @Input() visible = false;

  @Input() isSaveDisabled = false;

  @Output() save = new EventEmitter();

  @Output() visibleChange = new EventEmitter<boolean>();

  protected screen = inject(ScreenService);

  isValid() {
    return this.validationGroup.instance.validate().isValid;
  }

  onSaveClick() {
    if(!this.isValid()) {
      return
    }

    this.save.emit();
    this.close();
  }

  close() {
    this.validationGroup.instance.reset();
    this.visible = false;

    this.visibleChange.emit(this.visible);
  }

  getWrapperAttrs = (inputWrapperAttr) => {
    return {
      ...inputWrapperAttr,
      class: `${inputWrapperAttr.class} form-popup`,
    };
  }
}
