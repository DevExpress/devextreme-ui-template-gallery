import { Component, OnInit, NgModule, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,

  DxTabsComponent,
  DxDataGridComponent,
  DxToolbarModule
} from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

import { TaskType, Status, Priority } from './../../types/planing-task-list';

@Component({
  selector: 'planning-grid',
  templateUrl: './planning-grid.component.html',
  styleUrls: ['./planning-grid.component.scss']
})
export class PlanningGridComponent implements OnInit {
  @ViewChild('dataGridTasks', { static: false }) dataGrid: DxDataGridComponent;

  @Input() dataSource: DataSource;

  priorityList: Array<Priority> = [];
  statusList: Array<Status> = [];

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

  constructor() {
    for(const status in Status) {
      this.statusList.push(Status[status]);
    }

    for(const priority in Priority) {
      this.priorityList.push(Priority[priority]);
    }
  }

  onRowPreparedGrid = (e) => {
    const { rowType, data, rowElement }:
      { rowType: string, data: TaskType, rowElement: HTMLElement  } = e;

    if(rowType === 'header') return;

    if(data.status === Status.Completed) {
      rowElement.classList.add('completed');
    }
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

  tabValueChange = (e) => {
    const { itemData } = e;
    this.displayTaskComponent = itemData.text;
  }

  refreshGrid = () => {
    this.dataGrid.instance.refresh();
  }

  spaceToUnderscore = (value) => value.replace(/\ /g, '-');

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxDropDownButtonModule,
    DxToolbarModule,

    CommonModule
  ],
  providers: [],
  exports: [PlanningGridComponent],
  declarations: [PlanningGridComponent]
})
export class PlaningGridModule { }
