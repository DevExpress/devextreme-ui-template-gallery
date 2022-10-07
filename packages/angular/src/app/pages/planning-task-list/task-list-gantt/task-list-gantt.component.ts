import {
  Component, NgModule, Input, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxGanttModule, DxGanttComponent } from 'devextreme-angular/ui/gantt';
import { exportGantt as exportGanttToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { Task } from 'src/app/shared/types/task';

import 'jspdf-autotable';

@Component({
  selector: 'task-list-gantt',
  templateUrl: './task-list-gantt.component.html',
  styleUrls: ['./task-list-gantt.component.scss'],
})
export class TaskListGanttComponent {
  @ViewChild(DxGanttComponent, { static: false }) component: DxGanttComponent;

  @Input() dataSource: Task[];

  refresh() {
    this.component.instance.refresh();
  }

  insertTask() {
    this.component.instance.insertTask({});
  }

  onExporting() {
    exportGanttToPdf(
      {
        component: this.component.instance,
        createDocumentMethod: (args?: any) => new jsPDF(args),
      },
    ).then((doc) => doc.save('Tasks.pdf'));
  };

  constructor(private router: Router) {
  }

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
