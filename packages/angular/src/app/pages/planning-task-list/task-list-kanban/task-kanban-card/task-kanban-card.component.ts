import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskType } from 'src/app/shared/types/task'

@Component({
  selector: 'task-kanban-card',
  templateUrl: './task-kanban-card.component.html',
  styleUrls: ['./task-kanban-card.component.scss']
})
export class TaskKanbanCardComponent implements OnInit {
  @Input() task: TaskType;

  constructor() {
  }

  getAvatarText(name: string) {
    return name.split(' ').map(name => name[0]).join('');
  }

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [TaskKanbanCardComponent],
  declarations: [TaskKanbanCardComponent]
})
export class TaskKanbanCardModule { }
