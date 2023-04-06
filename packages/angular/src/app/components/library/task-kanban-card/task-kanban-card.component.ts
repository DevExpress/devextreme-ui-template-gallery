import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxButtonModule, DxToastModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { Task } from 'src/app/types/task';
import { UserAvatarModule } from 'src/app/components/library/user-avatar/user-avatar.component';

@Component({
  selector: 'task-kanban-card',
  templateUrl: './task-kanban-card.component.html',
  styleUrls: ['./task-kanban-card.component.scss'],
})
export class TaskKanbanCardComponent {
  @Input() task: Task;

  constructor(private router: Router) {
  }

  getAvatarText = (name: string) => name.split(' ').map((name) => name[0]).join('');

  notify = (e) => {
    e.event.stopPropagation();
    notify(`Edit '${this.task.text}' card event`);
  };

  navigateToDetails = () => {
    this.router.navigate(['/planning-task-details']);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxToastModule,

    CommonModule,
    UserAvatarModule,
  ],
  providers: [],
  exports: [TaskKanbanCardComponent],
  declarations: [TaskKanbanCardComponent],
})
export class TaskKanbanCardModule { }
