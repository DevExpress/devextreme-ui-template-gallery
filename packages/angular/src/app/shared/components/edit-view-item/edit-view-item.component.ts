import {
  Component, Input, NgModule, Output, EventEmitter,
} from '@angular/core';
import {DxButtonModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-view-item',
  template: `
    <ng-container *ngIf="!isEditing; else editing">
      <i *ngIf="icon" class="dx-icon dx-icon-{{ icon }}"></i>
      <div class="edit-view-item-wrapper"
           [class.with-label]="!icon">
        <label *ngIf="!icon" class="dx-texteditor-label">{{ label }}</label>
        <div #refViewContent class="ref-wrapper">
          <ng-content select="[view-content]"></ng-content>
        </div>
        <ng-container *ngIf="refViewContent.children.length === 0">
          <span class="edit-view-item-value">{{ renderedValue ? renderedValue : value }}</span>
        </ng-container>
      </div>
    </ng-container>

    <ng-template #editing>
      <div class="editorContentWrapper">
        <div #refEditorContent class="ref-wrapper">
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
            <dxi-button *ngIf="icon"
                        [options]="{icon, type: 'back', elementAttr: { class: 'field-icon' }}"
                        name="icon" location="before"
            ></dxi-button>
          </dx-text-box>
        </ng-container>
      </div>

    </ng-template>
  `,
  styles: [`
    @use '../../../../variables' as *;

    :host {
      display: flex;
      width: 100%;
      &::ng-deep .ref-wrapper:empty { display: none }

      &::ng-deep .editorContentWrapper {
        width: 100%;

        .dx-widget.dx-button.field-icon {
          margin-left: 0;
          pointer-events: none;
        }
      }

      .dx-icon {
        display: flex;
        align-items: center;
        font-size: 18px;
        margin: 0 $text-button-horizontal-padding;
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
          display: block;
          height: 15px;
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
  imports: [DxTextBoxModule, CommonModule, DxValidatorModule, DxButtonModule],
  declarations: [EditViewItemComponent],
  exports: [EditViewItemComponent],
})
export class EditViewItemModule { }
