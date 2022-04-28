import {
 Component, OnInit, NgModule, Input, SimpleChanges, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxLoadPanelModule,
  DxScrollViewModule,
  DxSortableModule,
  DxToastModule,
} from 'devextreme-angular';
import { DragStartEvent, ReorderEvent, AddEvent } from 'devextreme/ui/sortable';
import { Task } from 'src/app/shared/types/task';
import { Status, statusList } from 'src/app/shared/types/status';
import { ToastComponent, ToastModule } from 'src/app/shared/components';
import { TaskKanbanCardModule } from './task-kanban-card/task-kanban-card.component';

type Board = {
  name: Status
  cards: Task[]
};

@Component({
  selector: 'task-list-kanban',
  templateUrl: './task-list-kanban.component.html',
  styleUrls: ['./task-list-kanban.component.scss'],
})
export class TaskListKanbanComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: ToastComponent;

  @Input() dataSource: Task[];

  kanbanDataSource: Board[] = [];

  toastMessage: string;

  isVisibleToast: boolean;

  isLoading: boolean;

  statuses = statusList;

  fillOutBoard = (cards: Task[]): Board[] => {
    const result: Board[] = [];
    for (const status of statusList) {
      const value = cards.filter((item) => item.status === status);

      result.push(<Board>{ name: status, cards: value });
    }

    return result;
  };

  constructor() {
    this.toastMessage = '';

    this.isLoading = true;
    this.isVisibleToast = false;

    this.kanbanDataSource = this.fillOutBoard([]);
  }

  ngOnInit() {
    this.kanbanDataSource = this.fillOutBoard(this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = changes.dataSource.currentValue === undefined;
  }

  getCardsByStatus = (status: Status): Task[] => {
    const cards: Task[] = this.dataSource
      .filter((task) => task.status === status);

    return cards;
  };

  onListReorder = (e: ReorderEvent) => {
    const list = this.kanbanDataSource.splice(e.fromIndex, 1)[0];
    this.kanbanDataSource.splice(e.toIndex, 0, list);
  };

  onTaskDragStart(e: DragStartEvent) {
    const { fromData, fromIndex } = e;
    e.itemData = fromData.cards[fromIndex];
  }

  onTaskDrop(e: ReorderEvent | AddEvent) {
    const {
      fromData, toData, fromIndex, toIndex, itemData,
    } = e;

    itemData.status = toData.name;

    fromData.cards.splice(fromIndex, 1);
    toData.cards.splice(toIndex, 0, itemData);
  }

  notify = (text: string) => {
    this.toast.notify(text);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxSortableModule,
    DxToastModule,
    ToastModule,

    TaskKanbanCardModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskListKanbanComponent],
  declarations: [TaskListKanbanComponent],
})
export class TaskListKanbanModule { }
