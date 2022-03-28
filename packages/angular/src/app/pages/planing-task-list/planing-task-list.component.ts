import { Component, OnInit, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

import {
  PlanningKanbanModule,
  PlaningGridModule,
  PlanningGridComponent,
} from 'src/app/shared/components';

import { TaskType } from 'src/app/shared/types/TaskType';
import { tabPanelItems } from 'src/app/shared/types/resource';

@Component({
  // selector: 'app-planing-task-list',
  templateUrl: './planing-task-list.component.html',
  styleUrls: ['./planing-task-list.component.scss']
})
export class PlaningTaskListComponent implements OnInit {
  @ViewChild('planningDataGrid', { static: false }) dataGrid: PlanningGridComponent;

  @Output()
  tabValueChange = (e) => {
    this.displayTaskComponent = e.itemData.text;
    this.displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;
  }

  data: Array<TaskType> = [
    {
      id: 1,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: 'Low',
      startDate: new Date(1),
      dueDate: new Date,
      owner: 'First Last',
      status: 'Open',
    },
    {
      id: 2,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: 'Normal',
      startDate: new Date(2),
      dueDate: new Date,
      owner: 'First Last',
      status: 'Deferred',
    },
    {
      id: 3,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: 'Hight',
      startDate: new Date(3),
      dueDate: new Date,
      owner: 'First Last',
      status: 'Completed',
    },
    {
      id: 4,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: 'Low',
      startDate: new Date(4),
      dueDate: new Date,
      owner: 'First Last',
      status: 'In Progress',
    },
    {
      id: 5,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: 'Hight',
      startDate: new Date(5),
      dueDate: new Date,
      owner: 'First Last',
      status: 'Deferred',
    }
  ];
  dataSource: DataSource;

  tabPanelItems = tabPanelItems;

  displayTaskComponent = this.tabPanelItems[0].text;
  displayGrid = this.displayTaskComponent === this.tabPanelItems[0].text;

  constructor() {
    this.dataSource = new DataSource({
      key: 'id',
      store: new ArrayStore({
        key: 'id',
        data: this.data,
      })
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

    PlanningKanbanModule,
    PlaningGridModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskListComponent]
})
export class PlaningTaskListModule { }
