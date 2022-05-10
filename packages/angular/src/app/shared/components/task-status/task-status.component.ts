import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule, OnInit,
} from '@angular/core';
import { TaskStatus } from 'src/app/shared/types/task';

@Component({
  selector: 'task-status',
  template: `
  <span class="status status-{{ undescoreValue | lowercase }}">
    {{ value }}
  </span>
  `,
  styles: [`
  span.status {
    font-size: 14px;

    &.status-open {
      color: #505ed9;
    }

    &.status-in-progress {
      color: #34aa95;
    }

    &.status-deferred {
      color: #969696;
    }

    &.status-completed {
      color: #2b9029;
    }
  }
  `],
})
export class TaskStatusComponent implements OnInit {
  @Input() value: TaskStatus;

  undescoreValue = '';

  ngOnInit() {
    this.undescoreValue = this.spaceToUnderscore(this.value);
  }

  spaceToUnderscore = (value: TaskStatus) =>
    (value ? value.replace(/ /g, '-') : '');
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TaskStatusComponent],
  exports: [TaskStatusComponent],
})
export class TaskStatusModule { }
