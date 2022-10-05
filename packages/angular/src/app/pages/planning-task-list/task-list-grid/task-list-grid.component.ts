import {
  Component, NgModule, ViewChild, EventEmitter, Output, Input, SimpleChanges, OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { RowPreparedEvent } from 'devextreme/ui/data_grid';
import { ItemClickEvent as TabsItemClickEvenet } from 'devextreme/ui/tabs';
import {
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { exportDataGrid as exportToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import { taskPriorityList, taskStatusList } from 'src/app/shared/types/task';
import { Task } from 'src/app/shared/types/task';
import 'jspdf-autotable';

@Component({
  selector: 'task-list-grid',
  templateUrl: './task-list-grid.component.html',
  styleUrls: ['./task-list-grid.component.scss'],
})
export class TaskListGridComponent implements OnChanges {
  @ViewChild(DxDataGridComponent, { static: false }) component: DxDataGridComponent;

  @Input() dataSource: Task[];

  tasks: Task[];

  @Output() tabValueChanged: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();

  addRow() { 
    this.component.instance.addRow() 
  };

  refresh() {
    this.component.instance.refresh();
  }

  showColumnChooser() {
    this.component.instance.showColumnChooser();
  }

  search(text: string) {
    this.component.instance.searchByText(text);
  }

  onExportingToPdf() {
    const doc = new jsPDF();
    exportToPdf({
      jsPDFDocument: doc,
      component: this.component.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  };

  onExportingToXLSX() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Tasks');

    exportToXLSX({
      component: this.component.instance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tasks.xlsx');
      });
    });
  };

  constructor(private router: Router) {
  }

  isLoading = true;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  ngOnChanges(changes: SimpleChanges) {
    const currentData = changes.dataSource.currentValue;

    this.isLoading = !currentData;

    if (!this.isLoading) {
      this.tasks = currentData.filter((item) => !!item.status && !!item.priority);
    }
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

  navigateToDetails = () => {
    this.router.navigate(['/planning-task-details']);
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
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
