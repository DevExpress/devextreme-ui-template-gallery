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
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';
import {
  StatusIndicatorModule,
} from 'src/app/components';
import { exportDataGrid as exportToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import 'jspdf-autotable';

@Component({
  selector: 'task-list-grid',
  templateUrl: './task-list-grid.component.html',
  styleUrls: ['./task-list-grid.component.scss'],
})
export class TaskListGridComponent implements OnChanges {
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

  @Input() dataSource: Task[];

  @Output() tabValueChanged: EventEmitter<any> = new EventEmitter<EventEmitter<any>>();

  tasks: Task[];

  priorityList = taskPriorityList;

  statusList = taskStatusList;

  isLoading = true;

  useNavigation = true;

  constructor(private router: Router) {
  }

  refresh() {
    this.grid.instance.refresh();
  }

  showColumnChooser() {
    this.grid.instance.showColumnChooser();
  }

  search(text: string) {
    this.grid.instance.searchByText(text);
  }

  onExportingToPdf() {
    const doc = new jsPDF();
    exportToPdf({
      jsPDFDocument: doc,
      component: this.grid.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  };

  onExportingToXLSX() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Tasks');

    exportToXLSX({
      component: this.grid.instance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tasks.xlsx');
      });
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.tasks = changes.dataSource.currentValue.filter((item) => !!item.status && !!item.priority);
    }
  };

  toogleUseNavigation = () => {
    this.useNavigation = !this.useNavigation;
  };

  tabsItemClick = (e: DxTabsTypes.ItemClickEvent) => {
    this.tabValueChanged.emit(e);
  };

  navigateToDetails = (e: DxDataGridTypes.RowClickEvent) => {
    if(this.useNavigation && e.rowType !== 'detailAdaptive') {
      this.router.navigate(['/planning-task-details']);
    }
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,

    StatusIndicatorModule,

    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskListGridComponent],
  declarations: [TaskListGridComponent],
})
export class TaskListModule { }
