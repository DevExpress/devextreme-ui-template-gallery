import {
 Component, OnInit, NgModule, ViewChild, EventEmitter, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxDataGridComponent,
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
import { priorityList } from 'src/app/shared/types/priority';
import { statusList } from 'src/app/shared/types/status';
import { TaskType } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-list-grid',
  templateUrl: './task-list-grid.component.html',
  styleUrls: ['./task-list-grid.component.scss'],
  providers: [RwaService],
})
export class TaskListGridComponent implements OnInit {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

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

  statusList = statusList;

  priorityList = priorityList;

  tasks$: Observable<TaskType[]>;

  constructor(private service: RwaService) {
  }

  ngOnInit() {
    this.tasks$ = this.service.getTasks();
  }

  onRowPreparedGrid = (e: RowPreparedEvent<TaskType, number>) => {
    const { rowType, rowElement, data } = e;

    if (rowType === 'header') return;

    if (data.status === 'Completed') {
      rowElement.classList.add('completed');
    }
  };

  onRowValidating = (e: RowValidatingEvent<TaskType, number>) => {
    const { newData, brokenRules } = e;
    const { startDate, dueDate } = newData;

    if (startDate === undefined || dueDate === undefined) {
      e.errorText = 'Need set \'Start Date\' and \'Due Date\'';
      e.isValid = false;
    } else if (dueDate <= startDate) {
      e.errorText = '\'Start Date\' must be greater \'Due Date\'';
      e.isValid = false;
    } else if (brokenRules.length !== 0) {
      e.errorText = 'All fields must be filled';
    }
  };

  spaceToUnderscore = (value: string) => value.replace(/\ /g, '-');

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
