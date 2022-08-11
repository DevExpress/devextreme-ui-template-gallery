import {
  Component, OnInit, NgModule, Output, ViewChild, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { InputEvent as TextBoxInputEvent } from 'devextreme/ui/text_box';
import { tabPanelItems } from 'src/app/shared/types/resource';
import { Task } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { TaskListGridComponent, TaskListModule } from './task-list-grid/task-list-grid.component';
import { TaskListKanbanModule } from './task-list-kanban/task-list-kanban.component';
import { TaskListGanttModule } from './task-list-gantt/task-list-gantt.component';

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
    this.displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;
  };

  tasks: Task[];

  tabPanelItems = tabPanelItems;

  displayTaskComponent = this.tabPanelItems[0].text;

  displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;

  dataSubscription: Subscription = new Subscription();

  constructor(private service: RwaService) {
  }

  ngOnInit(): void {
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

  exportDataGrid = () => this.dataGrid.onExporting();
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
