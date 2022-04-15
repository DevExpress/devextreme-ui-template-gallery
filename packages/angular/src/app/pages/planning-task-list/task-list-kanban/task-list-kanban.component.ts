import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxScrollViewModule,
  DxSortableModule,
  DxButtonModule,
} from 'devextreme-angular';
import { DragStartEvent, ReorderEvent, AddEvent } from 'devextreme/ui/sortable'
import { TaskKanbanCardModule } from './task-kanban-card/task-kanban-card.component';
import { TaskType } from 'src/app/shared/types/task';
import { Status, statusList } from 'src/app/shared/types/status';
import { getTasks } from 'dx-rwa-data';

@Component({
  selector: 'task-list-kanban',
  templateUrl: './task-list-kanban.component.html',
  styleUrls: ['./task-list-kanban.component.scss']
})
export class TaskListKanbanComponent implements OnInit {
  dataSource: Array<TaskType>;

  kanbanDataSource: Array<{
    status: Status,
    tasks: TaskType[]
  }> = [];

  load: boolean = false;

  constructor() {
  }

  onListReorder = (e: ReorderEvent) => {
    const list = this.kanbanDataSource.splice(e.fromIndex, 1)[0];
    this.kanbanDataSource.splice(e.toIndex, 0, list);
  }

  getTaskByStatus = (status: Status) : Array<TaskType> => this.dataSource.filter(item => item.status === status);

  onTaskDragStart(e: DragStartEvent) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onTaskDrop(e: ReorderEvent | AddEvent) {
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  ngOnInit() {
    getTasks().then(tasks => {
      this.load = true;
      this.dataSource = tasks;
      
      for(const status of statusList) {
        this.kanbanDataSource.push({
          status: <Status>status,
          tasks: this.getTaskByStatus(<Status>status)
        });
      }
    })
  }
}

@NgModule({
  imports: [
    DxScrollViewModule,
    DxSortableModule,
    DxButtonModule,

    TaskKanbanCardModule,

    CommonModule
  ],
  providers: [],
  exports: [TaskListKanbanComponent],
  declarations: [TaskListKanbanComponent]
})
export class TaskListKanbanModule { }
