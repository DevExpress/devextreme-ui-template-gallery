import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxProgressBarModule,

  DxTabsComponent,
  DxDataGridComponent
} from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

import { PlanningKanbanModule } from './../../components/planning-kanban/planning-kanban.component';
import { TaskType, Status, Priority } from './../../types/planing-task-list';

@Component({
  // selector: 'app-planing-task-list',
  templateUrl: './planing-task-list.component.html',
  styleUrls: ['./planing-task-list.component.scss']
})
export class PlaningTaskListComponent implements OnInit {
  @ViewChild('dataGridTasks', { static: false }) dataGrid: DxDataGridComponent;

  priorityList: Array<Priority> = [];
  statusList: Array<Status> = [];

  data: Array<TaskType> = [
    {
      id: 1,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: Priority.Low,
      startDate: new Date(1),
      dueDate: new Date,
      owner: 'First Last',
      status: Status.Open,
    },
    {
      id: 2,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: Priority.Normal,
      startDate: new Date(2),
      dueDate: new Date,
      owner: 'First Last',
      status: Status.Deferred,
    },
    {
      id: 3,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: Priority.Hight,
      startDate: new Date(3),
      dueDate: new Date,
      owner: 'First Last',
      status: Status.Completed,
    },
    {
      id: 4,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: Priority.Low,
      startDate: new Date(4),
      dueDate: new Date,
      owner: 'First Last',
      status: Status.InProgress,
    },
    {
      id: 5,
      name: 'Task Name',
      description: 'Descr',
      company: 'DevEx',
      priority: Priority.Hight,
      startDate: new Date(5),
      dueDate: new Date,
      owner: 'First Last',
      status: Status.Deferred,
    }
  ];
  dataSource: DataSource;

  tabPanelItems: DxTabsComponent['items'] = [
    {
      text: 'List'
    },
    {
      text: 'Kanban Board'
    },
    {
      text: 'Gantt'
    }
  ];

  displayTaskComponent: string = this.tabPanelItems[0].text;

  priorityValidationPattern = new RegExp(`${Priority.Low}|${Priority.Normal}|${Priority.Hight}`);

  constructor() {
    this.dataSource = new DataSource({
      key: 'id',
      store: new ArrayStore({
        key: 'id',
        data: this.data,
      })
    });

    for(const status in Status) {
      this.statusList.push(Status[status]);
    }

    for(const priority in Priority) {
      this.priorityList.push(Priority[priority]);
    }
  }

  spaceToUnderscore = (value) => value.replace(/\ /g, '-');

  customizeHyphetText = (cellInfo) => cellInfo.value ?? '-';

  customizeDateText = (cellInfo) => {
    if(!cellInfo.value) return this.customizeHyphetText(cellInfo);

    const date: Date = new Date(cellInfo.value);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  onRowPreparedGrid = (e) => {
    const { rowType, data, rowElement }:
      { rowType: string, data: TaskType, rowElement: HTMLElement  } = e;

    if(rowType === 'header') return;

    if(data.status === Status.Completed) {
      rowElement.classList.add('completed');
    }
  }

  tabValueChange = (e) => {
    const { itemData } = e;
    this.displayTaskComponent = itemData.text;
  }

  refreshGrid = () => {
    this.dataGrid.instance.refresh();
  }

  dueDateValid = (e) => {
    const { startDate, dueDate, brokenRules } = e.newData;
    if(startDate === undefined || dueDate === undefined) {
      e.errorText = `Need set 'Start Date' and 'Due Date'`;
      e.isValid = false;
    } else if(dueDate <= startDate) {
      e.errorText = `'Start Date' must be greater 'Due Date'`;
      e.isValid = false;
    } else if (brokenRules.length !== 0) {
      e.errorText = 'All fields must be filled'
    }
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
    DxProgressBarModule,
    PlanningKanbanModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskListComponent]
})
export class PlaningTaskListModule { }
