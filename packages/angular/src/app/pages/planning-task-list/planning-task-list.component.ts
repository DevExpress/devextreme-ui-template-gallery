import {
 Component, OnInit, NgModule, Output, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { tabPanelItems } from 'src/app/shared/types/resource';
import { Task } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { TaskListGridComponent, TaskListModule } from './task-list-grid/task-list-grid.component';
import { TaskListKanbanModule } from './task-list-kanban/task-list-kanban.component';

@Component({
  // selector: 'app-planning-task-list',
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss'],
  providers: [RwaService],
})
export class PlanningTaskListComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @Output()
  tabValueChange = (e) => {
    this.displayTaskComponent = e.itemData.text;
    this.displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;
  };

  @Output()
  refresh() {
    this.dataGrid.refresh();
  }

  tasks: Task[];

  tabPanelItems = tabPanelItems;

  displayTaskComponent = this.tabPanelItems[0].text;

  displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;

  dataSubscription: Subscription;

  constructor(private service: RwaService) {
    this.refresh = this.refresh.bind(this);
  }

  ngOnInit(): void {
    const task$ = this.service.getTasks();

    this.dataSubscription = task$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  addDataGridRow = () => this.dataGrid.addRow();

  refreshDataGrid = () => this.dataGrid.refresh();

  chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();

  searchDataGrid = (e) => this.dataGrid.search(e.component.instance().option('text'));

  exportDataGrid = (e) => {
    const selectedRowsOnly = e.itemData.text.includes('selected');
    this.dataGrid.onExporting(e, selectedRowsOnly);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxLoadPanelModule,

    TaskListKanbanModule,
    TaskListModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskListComponent],
})
export class PlanningTaskListModule { }
