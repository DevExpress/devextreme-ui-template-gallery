import {
  Component, OnInit, NgModule, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import notify from 'devextreme/ui/notify';
import { taskPanelItems } from 'src/app/types/resource';
import { Task, newTask } from 'src/app/types/task';
import { DataService, ScreenService } from 'src/app/services';
import { forkJoin, map, Observable } from 'rxjs';
import { TaskFormComponent, TaskFormModule } from 'src/app/components/library/task-form/task-form.component';
import { FormPopupModule } from 'src/app/components/utils/form-popup/form-popup.component';
import { TaskListGridComponent, TaskListModule } from 'src/app/components/library/task-list-grid/task-list-grid.component';
import { TaskListKanbanModule, TaskListKanbanComponent } from 'src/app/components/library/task-list-kanban/task-list-kanban.component';
import { TaskListGanttComponent, TaskListGanttModule } from 'src/app/components/library/task-list-gantt/task-list-gantt.component';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';

@Component({
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss'],
  providers: [DataService],
})
export class PlanningTaskListComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @ViewChild('planningGantt', { static: false }) gantt: TaskListGanttComponent;

  @ViewChild('planningKanban', { static: false }) kanban: TaskListKanbanComponent;

  @ViewChild(TaskFormComponent, { static: false }) taskForm: TaskFormComponent;

  newTask = newTask;

  taskPanelItems = taskPanelItems;

  displayTaskComponent = this.taskPanelItems[0].text;

  isAddTaskPopupOpened = false;

  displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;

  displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;

  taskCollections$: Observable<{ allTasks: Task[]; filteredTasks: Task[] }>;

  constructor(private service: DataService, protected screen: ScreenService) {
  }

  ngOnInit(): void {
    this.taskCollections$ = forkJoin([
      this.service.getFilteredTasks(),
      this.service.getTasks()
    ]).pipe(
      map(
        ([filteredTasks, allTasks]) => { return { allTasks, filteredTasks }  })
    );
  }

  tabValueChange(e: DxTabsTypes.ItemClickEvent) {
    const { itemData } = e;

    this.displayTaskComponent = itemData.text;
    this.displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;
    this.displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;
  };

  addTask = () => {
    this.isAddTaskPopupOpened = true;
  };

  onClickSaveNewTask = () => {
    notify({
        message: `New task "${this.taskForm.getNewTaskData().text}" saved`,
        position: { at: 'bottom center', my: 'bottom center' }
      },
      'success');
  };

  refresh = () => {
    if (this.displayGrid) {
      this.dataGrid.refresh();
    } else if (this.displayKanban) {
      this.kanban.refresh();
    } else {
      this.gantt.refresh();
    }
  };

  chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();

  searchDataGrid = (e: DxTextBoxTypes.InputEvent) => this.dataGrid.search(e.component.option('text'));

  exportToPdf = () => {
    if (this.displayGrid) {
      this.dataGrid.onExportingToPdf();
    } else {
      this.gantt.onExporting();
    }
  };

  exportDataGridToXSLX = () => this.dataGrid.onExportingToXLSX();
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxToolbarModule,
    DxLoadPanelModule,
    FormPopupModule,

    TaskFormModule,
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
