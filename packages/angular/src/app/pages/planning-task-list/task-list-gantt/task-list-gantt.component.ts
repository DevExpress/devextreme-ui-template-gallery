import {
  Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxGanttModule } from 'devextreme-angular/ui/gantt';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-list-gantt',
  templateUrl: './task-list-gantt.component.html',
  styleUrls: ['./task-list-gantt.component.scss'],
})
export class TaskListGanttComponent {
  @Input() dataSource: Task[];

  constructor(private router: Router) {
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
