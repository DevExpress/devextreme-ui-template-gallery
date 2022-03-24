import { Component, OnInit, NgModule, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxDataGridComponent
} from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { priorityList } from 'src/app/shared/components/planning-task/priorety';
import { statusList } from 'src/app/shared/components/planning-task/statuses';
import { TaskType } from 'src/app/shared/components/planning-task/TaskType';
import { tabPanelItems } from 'src/app/shared/components/planning-task/resource';

@Component({
  selector: 'planning-grid',
  templateUrl: './planning-grid.component.html',
  styleUrls: ['./planning-grid.component.scss']
})
export class PlanningGridComponent implements OnInit {
  @ViewChild('dataGridTasks', { static: false }) dataGrid: DxDataGridComponent;

  @Input() dataSource: DataSource;

  @Output() tabValueChanged: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();

  statusList = statusList;
  priorityList = priorityList;
  tabPanelItems = tabPanelItems;

  displayTaskComponent: string = this.tabPanelItems[0].text;

  constructor() {
  }

  onRowPreparedGrid = (e) => {
    const { rowType, data, rowElement }:
      { rowType: string, data: TaskType, rowElement: HTMLElement  } = e;

    if(rowType === 'header') return;

    if(data.status === 'Completed') {
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

  tabsItemClick = (e) => {
    this.tabValueChanged.emit(e);
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
