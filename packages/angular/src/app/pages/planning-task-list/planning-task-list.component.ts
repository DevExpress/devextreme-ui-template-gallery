import {
  Component, OnInit, NgModule, Output, ViewChild, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { InputEvent as TextBoxInputEvent } from 'devextreme/ui/text_box';
import { taskPanelItems } from 'src/app/shared/types/resource';
import { Task } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { TaskListGridComponent, TaskListModule } from './task-list-grid/task-list-grid.component';
import { TaskListKanbanModule } from './task-list-kanban/task-list-kanban.component';
import { TaskListGanttModule } from './task-list-gantt/task-list-gantt.component';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';

@Component({
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss'],
  providers: [RwaService],
})
export class PlanningTaskListComponent implements OnInit, OnDestroy {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @Output() tabValueChange = (e: TabsItemClickEvent) => {
    const { itemData } = e;

    this.displayTaskComponent = itemData.text;
    this.displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;
  };

  tasks: Task[];

  taskPanelItems = taskPanelItems;

  displayTaskComponent = this.taskPanelItems[0].text;

  displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;

  dataSubscription: Subscription = new Subscription();

  taskCollections$: Observable<{ allTasks: Task[]; filteredTasks: Task[] }>;

  constructor(private service: RwaService) {
  }

  ngOnInit(): void {
    this.taskCollections$ = forkJoin([
      this.service.getFilteredTasks(),
      this.service.getTasks()
    ]).pipe(
      map(
        ([filteredTasks, allTasks]) => { return { allTasks, filteredTasks } })
    );
    this.dataSubscription = this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  addDataGridRow = () => this.dataGrid.addRow();

  refreshDataGrid = () => this.dataGrid.refresh();

  chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();

  searchDataGrid = (e: TextBoxInputEvent) => this.dataGrid.search(e.component.option('text'));

  exportDataGrid = () => this.dataGrid.exporting();
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxToolbarModule,
    DxLoadPanelModule,

    TaskListKanbanModule,
    TaskListModule,
    TaskListGanttModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskListComponent],
})
export class PlanningTaskListModule { }
