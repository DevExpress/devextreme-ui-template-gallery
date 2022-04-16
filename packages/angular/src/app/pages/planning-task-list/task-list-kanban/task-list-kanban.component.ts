import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxScrollViewModule,
  DxSortableModule,
  DxButtonModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { DragStartEvent, ReorderEvent, AddEvent } from 'devextreme/ui/sortable'
import {
  ShowingEvent as LoadPanelShowingEvent,
  ShownEvent as LoadPanelShownEvent
} from 'devextreme/ui/load_panel';
import { TaskKanbanCardModule } from './task-kanban-card/task-kanban-card.component';
import { TaskType } from 'src/app/shared/types/task';
import { Status, statusList } from 'src/app/shared/types/status';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';

type Board = {
  name: Status
  cards: TaskType[]
}

@Component({
  selector: 'task-list-kanban',
  templateUrl: './task-list-kanban.component.html',
  styleUrls: ['./task-list-kanban.component.scss'],
  providers: [RwaService]
})
export class TaskListKanbanComponent implements OnInit {
  dataSubscription: Subscription;

  isLoading: boolean;
  kanbanDataSource: Board[] = [];

  fillOutBoard = (cards: TaskType[]): Board[] => {
    const result: Board[] = [];
    for(const status of statusList) {
      const value = cards.filter((item) => item.status === status);

      result.push(<Board>{ name: status, cards: value });
    }

    return result
  }

  constructor(private service: RwaService) {
    this.isLoading = true;
    this.kanbanDataSource = this.fillOutBoard([]);
  }

  ngOnInit() {
    const tasks$ = this.service.getTasks();
  
    this.isLoading = true;
    this.dataSubscription = tasks$.subscribe((data) => {
      this.kanbanDataSource = this.fillOutBoard(data);
      
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onListReorder = (e: ReorderEvent) => {
    const list = this.kanbanDataSource.splice(e.fromIndex, 1)[0];
    this.kanbanDataSource.splice(e.toIndex, 0, list);
  }

  onTaskDragStart(e: DragStartEvent) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onTaskDrop(e: ReorderEvent | AddEvent) {
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }
}

@NgModule({
  imports: [
    DxScrollViewModule,
    DxSortableModule,
    DxButtonModule,
    DxLoadPanelModule,

    TaskKanbanCardModule,

    CommonModule
  ],
  providers: [],
  exports: [TaskListKanbanComponent],
  declarations: [TaskListKanbanComponent]
})
export class TaskListKanbanModule { }
