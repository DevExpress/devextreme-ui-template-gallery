import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule, OnInit,
} from '@angular/core';
import { TaskStatus, TaskPriority } from 'src/app/types/task';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';

@Component({
  selector: 'status-indicator',
  template: `
  <div
    [ngClass]="{'input-with-bar': showBar }"
    class="
      status
      status-indicator
      status-indicator-{{ dashValue }}">
      <span *ngIf="!isField" class="status-indicator-{{ dashValue }}">{{ getValue(value) }}</span>
      <dx-text-box
        *ngIf="isField"
        class="status-indicator-{{ dashValue }}"
        [inputAttr]="{class: 'status-input status-editor-input'}"
        [hoverStateEnabled]="false"
        [readOnly]="true"
        [value]="getValue(value)">
      </dx-text-box>
    </div>
  `,
  styleUrls: ['./status-indicator.component.scss'],
})
export class StatusIndicatorComponent implements OnInit {
  @Input() value: TaskStatus | TaskPriority;

  @Input() isField = true;

  @Input() showBar = false;

  dashValue = '';

  ngOnInit() {
    this.dashValue = this.spaceToDash(this.value).toLowerCase();
  }

  getValue(value: string): string {
    return (this.showBar ? '| ' : '') + value;
  }

  spaceToDash = (value: TaskStatus) =>
    (value?.replace(/ /g, '-') || '');
}

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
  ],
  declarations: [StatusIndicatorComponent],
  exports: [StatusIndicatorComponent],
})
export class StatusIndicatorModule { }
