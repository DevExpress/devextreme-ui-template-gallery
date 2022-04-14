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
import {
  TaskProirityModule,
  TaskStatusModule,
} from '../';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import CustomStore from 'devextreme/data/custom_store';
import { priorityList } from 'src/app/shared/types/priority';
import { statusList } from 'src/app/shared/types/status';
import { TaskType } from 'src/app/shared/types/task';
import { getTasks } from 'dx-rwa-data';

@Component({
  selector: 'planning-grid',
  templateUrl: './planning-grid.component.html',
  styleUrls: ['./planning-grid.component.scss']
})
export class PlanningGridComponent implements OnInit {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

  @Output() tabValueChanged: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();

  @Output() addRow = () => this.component.instance.addRow();

  @Output() refresh = () => this.component.instance.refresh();

  @Output() showColumnChooser = () => this.component.instance.showColumnChooser();

  @Output() search = (text: string) => this.component.instance.searchByText(text);

  @Output() onExporting = (e, selectedRowsOnly: boolean) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: this.component.instance,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedRowsOnly
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
    e.cancel = true;
  }

  statusList = statusList;
  priorityList = priorityList;

  dataSource: CustomStore;

  constructor() {
    this.dataSource = new CustomStore({
      key: 'id',
      load: getTasks
    });
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
    TaskProirityModule,
    TaskStatusModule,

    CommonModule
  ],
  providers: [],
  exports: [PlanningGridComponent],
  declarations: [PlanningGridComponent]
})
export class PlanningGridModule { }
