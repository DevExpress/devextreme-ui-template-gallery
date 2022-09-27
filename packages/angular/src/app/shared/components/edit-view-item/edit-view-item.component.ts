import {
  Component, Input, NgModule, Output, EventEmitter,
} from '@angular/core';
import { DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-view-item',
  template: `
    <i *ngIf="icon" class="dx-icon dx-icon-{{ icon }}"></i>
    <ng-container *ngIf="!isEditing; else editing">
      <div class="edit-view-item-wrapper"
           [class.with-label]="!icon">
        <label *ngIf="!icon" class="dx-texteditor-label">{{ label }}</label>
        <div #refValueContent>
          <ng-content select="[view-content]"></ng-content>
        </div>
        <ng-container *ngIf="refValueContent.children.length === 0">
          <span class="edit-view-item-value">{{ renderedValue ? renderedValue : value }}</span>
        </ng-container>
      </div>
    </ng-container>

    <ng-template #editing>
      <div #refEditorContent class="editorContentWrapper">
        <ng-content select="[editor-content]"></ng-content>
      </div>
      <ng-container *ngIf="refEditorContent.children.length === 0">
        <dx-text-box
          [label]="icon ? '' : label"
          [value]="value"
          (onValueChanged)="onChangeValue($event)"
          [mask]="mask"
          valueChangeEvent="keyup input change"
        >
          <dx-validator [validationRules]="validators" [validationGroup]="validationGroup"></dx-validator>
        </dx-text-box>
      </ng-container>
    </ng-template>
  `,
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

  @Input() value: string | Date | number;

  @Input() mask: string;

  @Input() renderedValue = '';

  @Input() editorTpl: any = null;

  @Input() valueTpl: any = null;

  @Input() validators: any[] = [];

  @Input() validationGroup: string = undefined;

  @Output() valueChange = new EventEmitter<string | Date | number>();

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
