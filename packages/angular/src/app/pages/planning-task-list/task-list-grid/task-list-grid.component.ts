import {
 Component, OnInit, NgModule, ViewChild, EventEmitter, Output, Input, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxLoadPanelModule,
  DxTabsModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { RowPreparedEvent, RowValidatingEvent, ExportingEvent } from 'devextreme/ui/data_grid';
import { ItemClickEvent as TabsItemClickEvenet } from 'devextreme/ui/tabs';
import {
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { taskPriorityList, taskStatusList } from 'src/app/shared/types/task';
import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-list-grid',
  templateUrl: './task-list-grid.component.html',
  styleUrls: ['./task-list-grid.component.scss'],
})
export class TaskListGridComponent implements OnInit {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

  @Input() dataSource: Task[];

  @Output() tabValueChanged: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();

  @Output() addRow = () => this.component.instance.addRow();

  @Output() refresh = () => this.component.instance.refresh();

  @Output() showColumnChooser = () => this.component.instance.showColumnChooser();

  @Output() search = (text: string) => this.component.instance.searchByText(text);

  @Output() onExporting = (e: ExportingEvent, selectedRowsOnly: boolean) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: this.component.instance,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
    e.cancel = true;
  };

  isLoading: Boolean;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  constructor() {
    this.isLoading = true;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = changes.dataSource.currentValue === undefined;
  }

  onRowPreparedGrid = (e: RowPreparedEvent<Task, number>) => {
    const { rowType, rowElement, data } = e;

    if (rowType === 'header') return;

    if (data.status === 'Completed') {
      rowElement.classList.add('completed');
    }
  };

  tabsItemClick = (e: TabsItemClickEvenet) => {
    this.tabValueChanged.emit(e);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxLoadPanelModule,

    TaskProirityModule,
    TaskStatusModule,

    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskListGridComponent],
  declarations: [TaskListGridComponent],
})
export class TaskListModule { }
