import {
  Component, OnInit, NgModule, Input, SimpleChanges, OnChanges, Output, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSortableModule, DxSortableComponent } from 'devextreme-angular/ui/sortable';
import { DxMenuModule } from 'devextreme-angular/ui/menu';
import notify from 'devextreme/ui/notify';
import { DragStartEvent, ReorderEvent, AddEvent } from 'devextreme/ui/sortable';
import { Task } from 'src/app/shared/types/task';
import { TaskStatus, taskStatusList } from 'src/app/shared/types/task';
import { TaskKanbanCardModule } from './task-kanban-card/task-kanban-card.component';

type Board = {
  name: TaskStatus
  cards: Task[]
};

@Component({
  selector: 'task-list-kanban',
  templateUrl: './task-list-kanban.component.html',
  styleUrls: ['./task-list-kanban.component.scss'],
})
export class TaskListKanbanComponent implements OnInit, OnChanges {
  @ViewChild(DxSortableComponent, { static: false }) component: DxSortableComponent;

  @Input() dataSource: Task[];

  @Output() refresh = () => this.component.instance.update();

  kanbanDataSource: Board[] = [];

  isLoading = true;

  statuses = taskStatusList;

  boardMenuItems: Array<{ icon: string, items: Array<{ text: string }> }> = [{
    icon: 'more',
    items: [
      { text: 'Add card...' },
      { text: 'Copy list..' },
      { text: 'Move list..' },
    ],
  },
  ];

  fillOutBoard = (cards: Task[]): Board[] => {
    const result: Board[] = [];
    for (const status of this.statuses) {
      const value = cards.filter((item) => item.status === status);

      result.push(<Board>{ name: status, cards: value });
    }

    return result;
  };

  constructor() {
    this.kanbanDataSource = this.fillOutBoard([]);
  }

  ngOnInit() {
    this.kanbanDataSource = this.fillOutBoard(this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = changes.dataSource.currentValue === undefined;
  }

  getCardsByStatus = (status: TaskStatus): Task[] => {
    const cards: Task[] = this.dataSource
      .filter((task) => task.status === status);

    return cards;
  };

  onListReorder = (e: ReorderEvent) => {
    const { fromIndex, toIndex } = e;
    const list = this.kanbanDataSource.splice(fromIndex, 1)[0];
    this.kanbanDataSource.splice(toIndex, 0, list);
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
    notify(text);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxSortableModule,
    DxMenuModule,

    TaskKanbanCardModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskListKanbanComponent],
  declarations: [TaskListKanbanComponent],
})
export class TaskListKanbanModule { }
