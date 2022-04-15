import { Component, OnInit, NgModule, Output, ViewChild } from '@angular/core';
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
import { TaskListGridComponent, TaskListModule } from './task-list-grid/task-list-grid.component'
import { TaskListKanbanModule } from './task-list-kanban/task-list-kanban.component';

import { tabPanelItems } from 'src/app/shared/types/resource';
import { getTasks } from 'dx-rwa-data';

@Component({
  // selector: 'app-planning-task-list',
  templateUrl: './planning-task-list.component.html',
  styleUrls: ['./planning-task-list.component.scss']
})
export class PlanningTaskListComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  @Output()
  tabValueChange = (e) => {
    this.displayTaskComponent = e.itemData.text;
    this.displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;
  }

  tabPanelItems = tabPanelItems;

  dataSource: any[];

  displayTaskComponent = this.tabPanelItems[0].text;
  displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;

  constructor() {
    this.refresh = this.refresh.bind(this);

    getTasks().then((data) => {
      this.dataSource = data;
      this.load = false;
    });

  }

  addDataGridRow = () => this.dataGrid.addRow();

  refreshDataGrid = () => this.dataGrid.refresh();

  chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();
  
  searchDataGrid = (e) => this.dataGrid.search(e.component.instance().option('text'));

  exportDataGrid = (e) => {
    const selectedRowsOnly = e.itemData.text.includes('selected');
    this.dataGrid.onExporting(e, selectedRowsOnly);
  }

  load = true;

  @Output()
  refresh() {
    this.load = true;
    getTasks().then((data) => {
      this.dataSource = data;
      this.load = false;
    });
  }

  ngOnInit(): void {
  }
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

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskListComponent]
})
export class PlanningTaskListModule { }
