import {
  Component, OnInit, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxToastModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-kanban-card',
  templateUrl: './task-kanban-card.component.html',
  styleUrls: ['./task-kanban-card.component.scss'],
})
export class TaskKanbanCardComponent implements OnInit {
  @Input() task: Task;

  constructor() {
  }

  ngOnInit(): void {
  }

  getAvatarText = (name: string) => name.split(' ').map((name) => name[0]).join('');

  notify = () => {
    notify(`Edit '${this.task.text}' card event`);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxToastModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskKanbanCardComponent],
  declarations: [TaskKanbanCardComponent],
})
export class TaskKanbanCardModule { }
