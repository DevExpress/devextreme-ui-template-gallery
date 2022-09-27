import {
  Component, OnInit, NgModule, Output, ViewChild, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
// import { ExportingEvent } from 'devextreme/ui/data_grid';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { InputEvent as TextBoxInputEvent } from 'devextreme/ui/text_box';
import { taskPanelItems } from 'src/app/shared/types/resource';
import { Task } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { TaskListGridComponent, TaskListModule } from './task-list-grid/task-list-grid.component';
import { TaskListKanbanModule, TaskListKanbanComponent } from './task-list-kanban/task-list-kanban.component';
import { TaskListGanttComponent, TaskListGanttModule } from './task-list-gantt/task-list-gantt.component';

@Component({
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss'],
  providers: [RwaService],
})
export class PlanningTaskListComponent implements OnInit, OnDestroy {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @ViewChild('planningGantt', { static: false }) gantt: TaskListGanttComponent;

  @ViewChild('planningKanban', { static: false }) kanban: TaskListKanbanComponent;

  @Output() tabValueChange = (e: TabsItemClickEvent) => {
    const { itemData } = e;

    this.displayTaskComponent = itemData.text;
    this.displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;
    this.displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;
  };

  tasks: Task[];

  taskPanelItems = taskPanelItems;

  displayTaskComponent = this.taskPanelItems[0].text;

  displayGrid = this.displayTaskComponent === this.taskPanelItems[0].text;

  displayKanban = this.displayTaskComponent === this.taskPanelItems[1].text;

  dataSubscription: Subscription = new Subscription();

  constructor(private service: RwaService, private router: Router) {
  }

  ngOnInit(): void {
    this.dataSubscription = this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  addTask = () => {
    if (this.displayGrid) {
      this.dataGrid.addRow();
    } else {
      this.navigateToDetails();
    }
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

  navigateToDetails = () => {
    this.router.navigate(['/planning-task-details']);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxToolbarModule,

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
