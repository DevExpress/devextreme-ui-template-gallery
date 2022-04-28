import {
 Component, OnInit, Input, NgModule, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxToastModule } from 'devextreme-angular';
import { ToastComponent, ToastModule } from 'src/app/shared/components';

import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-kanban-card',
  templateUrl: './task-kanban-card.component.html',
  styleUrls: ['./task-kanban-card.component.scss'],
})
export class TaskKanbanCardComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: ToastComponent;

  @Input() task: Task;

  constructor() {
  }

  ngOnInit(): void {
  }

  getAvatarText = (name: string) => name.split(' ').map((name) => name[0]).join('');

  displayToast = () => {
    this.toast.notify(`Edit '${this.task.text}' card event`);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxToastModule,

    ToastModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskKanbanCardComponent],
  declarations: [TaskKanbanCardComponent],
})
export class TaskKanbanCardModule { }
