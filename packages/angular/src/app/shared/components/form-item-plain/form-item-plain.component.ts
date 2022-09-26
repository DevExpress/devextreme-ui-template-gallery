import {
  Component, Input, NgModule, Output, EventEmitter,
} from '@angular/core';
import { DxTextBoxModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-item-plain',
  template: `
    <i *ngIf="icon" class="dx-icon dx-icon-{{ icon }}"></i>
    <ng-container *ngIf="!isEditing; else editing">
      <div class="custom-form-item-wrapper"
           [class.with-label]="!icon">
        <label *ngIf="!icon" class="dx-texteditor-label">{{ label }}</label>
        <ng-container *ngTemplateOutlet="valueTpl || defaultValueTpl"></ng-container>
      </div>
    </ng-container>

    <ng-template #editing>
      <ng-container *ngTemplateOutlet="editorTpl || textboxEditor"></ng-container>
    </ng-template>

    <ng-template #defaultValueTpl>
      <span class="custom-form-item-value">{{ renderedValue ? renderedValue : value }}</span>
    </ng-template>

    <ng-template #textboxEditor>
      <dx-text-box
        [label]="icon ? '' : label"
        [value]="value"
        (onValueChanged)="onChangeValue($event)"
        [mask]="mask"
      ></dx-text-box>
    </ng-template>
  `,
  styles: [`
  :host {
    display: flex;
    width: 100%;
    gap: 5px;


    .dx-icon {
      display: flex;
      align-items: center;
    }

    dx-text-box {
      flex: 1;
    }

    .custom-form-item-wrapper {
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

      .custom-form-item-value {
        font-size: 13px;
      }
    }
  }
  `],
})
export class FormItemPlainComponent {
  @Input() isEditing: boolean;

  @Input() label: string;

  @Input() icon: string;

  @Input() value: string;

  @Input() mask: string;

  @Input() renderedValue: string | unknown = '';

  @Input() editorTpl: any = null;

  @Input() valueTpl: any = null;

  @Output() valueChange = new EventEmitter<string>();

  onChangeValue(event) {
    this.valueChange.emit(event.value);
  }
}

@NgModule({
  imports: [DxTextBoxModule, CommonModule],
  declarations: [FormItemPlainComponent],
  exports: [FormItemPlainComponent],
})
export class FormItemPlainModule { }
