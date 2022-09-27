import {
  Component, NgModule, Input, SimpleChanges, OnChanges, Output, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxGanttModule, DxGanttComponent } from 'devextreme-angular/ui/gantt';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { exportGantt as exportGanttToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { Task } from 'src/app/shared/types/task';

import 'jspdf-autotable';

@Component({
  selector: 'task-list-gantt',
  templateUrl: './task-list-gantt.component.html',
  styleUrls: ['./task-list-gantt.component.scss'],
})
export class TaskListGanttComponent implements OnChanges {
  @ViewChild(DxGanttComponent, { static: false }) component: DxGanttComponent;

  @Input() dataSource: Task[];

  @Output() refresh = () => this.component.instance.refresh();

  @Output() insertTask = () => this.component.instance.insertTask({});

  @Output() onExporting = () => {
    exportGanttToPdf(
      {
        component: this.component.instance,
        createDocumentMethod: (args?: any) => new jsPDF(args),
      },
    ).then((doc) => doc.save('Tasks.pdf'));
  };

  isLoading = true;

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.dataSource.currentValue;
  }

  navigateToDetails = () => {
    this.router.navigate(['/planning-task-details']);
  };
}

@NgModule({
  imports: [
    DxGanttModule,
    DxLoadPanelModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskListGanttComponent],
  declarations: [TaskListGanttComponent],
})
export class TaskListGanttModule { }
