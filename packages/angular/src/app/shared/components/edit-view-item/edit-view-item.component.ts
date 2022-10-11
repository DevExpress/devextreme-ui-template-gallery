import {
  Component, Directive, Input, NgModule, Output, EventEmitter, ContentChild,
} from '@angular/core';
import {DxButtonModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Directive({selector: '[view-content]'})
export class ViewContentDirective {}

@Directive({selector: '[editor-content]'})
export class EditorContentDirective {}

@Component({
  selector: 'edit-view-item',
  template: `
    <ng-container *ngIf="!isEditing; else editing">
      <i *ngIf="icon" class="dx-icon dx-icon-{{ icon }}"></i>
      <div class="view-content-wrapper" [class.with-label]="!icon">
        <label *ngIf="!icon" class="dx-texteditor-label">{{ label }}</label>
        <ng-content select="[view-content]"></ng-content>
        <span *ngIf="!viewContent"
              class="view-content-value">
          {{ renderedValue ? renderedValue : value }}
        </span>
      </div>
    </ng-container>

    <ng-template #editing>
      <div class="editor-content-wrapper">
        <ng-content select="[editor-content]"></ng-content>
        <dx-text-box *ngIf="!editorContent"
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
      </div>

    </ng-template>
  `,
  styles: [`
    @use '../../../../variables' as *;

    $field-height: 32.2px;

    :host {
      display: flex;
      width: 100%;
      height: $field-height;

      .view-content-wrapper {
        position: relative;
        padding: 9px 11px 8px;
        block-size: $field-height;

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

        .view-content-value {
          display: flex;
          height: calc(#{$field-height} - 17px);
          line-height: 16px;
          font-size: 13px;
        }
      }

      .editor-content-wrapper::ng-deep {
        width: 100%;

        .dx-widget.dx-button.field-icon {
          margin-left: 0;
          pointer-events: none;
        }
      }

      @supports (-moz-appearance:none) {
        .view-content-value {
          align-items: center;
        }

        &::ng-deep .dx-texteditor-input {
          height: $field-height;
        }
      }

      .dx-icon {
        display: flex;
        align-items: center;
        font-size: 18px;
        margin: 0 $text-button-horizontal-padding;
      }
    }
  `],

})
export class EditViewItemComponent {
  @ContentChild(ViewContentDirective) viewContent!: ViewContentDirective;

  @ContentChild(EditorContentDirective) editorContent: EditorContentDirective;

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
  declarations: [EditViewItemComponent, ViewContentDirective, EditorContentDirective],
  exports: [EditViewItemComponent, ViewContentDirective, EditorContentDirective],
})
export class EditViewItemModule { }
