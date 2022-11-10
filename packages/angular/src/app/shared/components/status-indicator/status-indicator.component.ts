import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule, OnInit,
} from '@angular/core';
import { TaskStatus, TaskPriority } from 'src/app/shared/types/task';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';

@Component({
  selector: 'status-indicator',
  template: `
  <div
    [ngClass]="{'input-with-bar': showBar }"
    class="
      status
      status-indicator
      status-indicator-{{ value | lowercase }}">
      <span *ngIf="!isField" class="status-indicator-{{ value | lowercase }}">{{ getValue(value) }}</span>
      <dx-text-box
        *ngIf="isField"
        class="status-indicator-{{value.replace(' ', '-') | lowercase}}"
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

  undescoreValue = '';

  ngOnInit() {
    this.undescoreValue = this.spaceToUnderscore(this.value);
  }

  getValue(value: string): string {
    return this.showBar ? `| ${value}` : value;
  }

  spaceToUnderscore = (value: TaskStatus) =>
    (value ? value.replace(/ /g, '-') : '');
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
