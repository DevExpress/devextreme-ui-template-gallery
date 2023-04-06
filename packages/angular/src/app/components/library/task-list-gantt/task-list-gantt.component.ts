import {
  Component, NgModule, Input, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxGanttModule, DxGanttComponent } from 'devextreme-angular/ui/gantt';
import { exportGantt as exportGanttToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { Task } from 'src/app/types/task';

import 'jspdf-autotable';

@Component({
  selector: 'task-list-gantt',
  templateUrl: './task-list-gantt.component.html',
  styleUrls: ['./task-list-gantt.component.scss'],
})
export class TaskListGanttComponent {
  @ViewChild(DxGanttComponent, { static: false }) gantt: DxGanttComponent;

  @Input() dataSource: Task[];

  constructor(private router: Router) {
  }

  refresh() {
    this.gantt.instance.refresh();
  }

  onExporting() {
    exportGanttToPdf(
      {
        component: this.gantt.instance,
        createDocumentMethod: (args?: any) => new jsPDF(args),
      },
    ).then((doc) => doc.save('Tasks.pdf'));
  };

  navigateToDetails = () => {
    this.router.navigate(['/planning-task-details']);
  };
}

@NgModule({
  imports: [
    DxGanttModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskListGanttComponent],
  declarations: [TaskListGanttComponent],
})
export class TaskListGanttModule { }
