import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule,
} from '@angular/core';
import { TaskPriority } from 'src/app/shared/types/task';

@Component({
  selector: 'task-priority',
  template: `
  <div class="priority priority-{{ value | lowercase }}">
    <div class="separator"></div>
    <span>{{ value }}</span>
  </div>
  `,
  styles: [`
  .priority {
    display: flex;
    align-items: center;

    &.priority-low {
      color: #d3a268;

      .separator {
        background: #d3a268;
      }
    }

    &.priority-normal {
      color: #6fbaca;

      .separator {
        background: #6fbaca;
      }
    }

    &.priority-high {
      color: #ff5722;

      .separator {
        background: #ff5722;
      }
    }

    .separator {
      width: 2px;
      height: 18px;
      margin-right: 6px;
      border-radius: 2px;
      display: inline-block;
    }

    span {
      font-weight: 600;
      font-size: 12px;
    }
  }
  `],
})
export class TaskProirityComponent {
  @Input() value: TaskPriority;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [TaskProirityComponent],
  declarations: [TaskProirityComponent],
})
export class TaskProirityModule { }
