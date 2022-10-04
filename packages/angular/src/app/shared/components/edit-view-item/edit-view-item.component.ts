import {
  Component, Input, NgModule, Output, EventEmitter,
} from '@angular/core';
import { DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-view-item',
  templateUrl: './edit-view-item.component.html',
  styles: [`
    :host {
      display: flex;
      width: 100%;

      .editorContentWrapper {
        &:empty { display: none }
        width: 100%;
      }

      .dx-icon {
        display: flex;
        align-items: center;
      }

      dx-text-box {
        flex: 1;
      }

      .edit-view-item-wrapper {
        position: relative;
        padding: 9px 11px 8px;
        block-size: 32.2px;

        &.with-label {
          padding-top: 15px;
          padding-bottom: 1px;

          .dx-texteditor-label {
            top: 4px;
            height: 11px;
            line-height: 11px;
            padding-left: 11px;
          }
        }

        .edit-view-item-value {
          font-size: 13px;
        }
      }
    }
  `],
})
export class EditViewItemComponent {
  @Input() isEditing: boolean;

  @Input() label: string;

  @Input() icon: string;

  @Input() value: string;

  @Input() mask: string;

  @Input() renderedValue: string | unknown = '';

  @Input() validators: any[] = [];

  @Input() validationGroup: string = undefined;

  @Output() valueChange = new EventEmitter<string>();

  onChangeValue(event) {
    this.valueChange.emit(event.value);
  }
}

@NgModule({
  imports: [DxTextBoxModule, CommonModule, DxValidatorModule],
  declarations: [EditViewItemComponent],
  exports: [EditViewItemComponent],
})
export class EditViewItemModule { }
