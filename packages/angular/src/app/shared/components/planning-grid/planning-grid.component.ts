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
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import DataSource from 'devextreme/data/data_source';
import { priorityList } from 'src/app/shared/types/priorety';
import { statusList } from 'src/app/shared/types/statuses';
import { TaskType } from 'src/app/shared/types/TaskType';

@Component({
  selector: 'planning-grid',
  templateUrl: './planning-grid.component.html',
  styleUrls: ['./planning-grid.component.scss']
})
export class PlanningGridComponent implements OnInit {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

  @Input() dataSource: DataSource;

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
