import {
  Component, OnInit, NgModule, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { InputEvent as TextBoxInputEvent } from 'devextreme/ui/text_box';
import { taskPanelItems } from 'src/app/shared/types/resource';
import { Task, newTask } from 'src/app/shared/types/task';
import { RwaService, ScreenService } from 'src/app/shared/services';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { TaskFormModule } from '../planning-task-details/task-form/task-form.component';
import { TaskListGridComponent, TaskListModule } from './task-list-grid/task-list-grid.component';
import { TaskListKanbanModule, TaskListKanbanComponent } from './task-list-kanban/task-list-kanban.component';
import { TaskListGanttComponent, TaskListGanttModule } from './task-list-gantt/task-list-gantt.component';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';

@Component({
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss'],
  providers: [RwaService],
})
export class PlanningTaskListComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @ViewChild('planningGantt', { static: false }) gantt: TaskListGanttComponent;

  @ViewChild('planningKanban', { static: false }) kanban: TaskListKanbanComponent;

  newTask = newTask;

  taskPanelItems = taskPanelItems;

  displayTaskComponent = this.taskPanelItems[0].text;

  displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;

  displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;

  taskCollections$: Observable<{ allTasks: Task[]; filteredTasks: Task[] }>;

  screenSubscription: Subscription;

  popupVisible = false;

  popupFullScreen = false;

  constructor(private service: RwaService, private screen: ScreenService) {
    this.closePopup = this.closePopup.bind(this);
  }

  ngOnInit(): void {
    this.taskCollections$ = forkJoin([
      this.service.getFilteredTasks(),
      this.service.getTasks()
    ]).pipe(
      map(
        ([filteredTasks, allTasks]) => { return { allTasks, filteredTasks }  })
    );

    this.popupFullScreen = this.checkScreenSize();
    this.screenSubscription = this.screen.changed.subscribe(() => this.updatePopup());
  }

  tabValueChange(e: TabsItemClickEvent) {
    const { itemData } = e;

    this.displayTaskComponent = itemData.text;
    this.displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;
    this.displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;
  };

  checkScreenSize() {
    return this.screen.sizes['screen-small'] || this.screen.sizes['screen-x-small'];
  }

  updatePopup() {
    this.popupFullScreen = this.checkScreenSize();
  }

  closePopup() {
    this.popupVisible = false;
  }

  addTask = () => {
    this.popupVisible = true;
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

  searchDataGrid = (e: TextBoxInputEvent) => this.dataGrid.search(e.component.option('text'));

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
    DxPopupModule,

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
