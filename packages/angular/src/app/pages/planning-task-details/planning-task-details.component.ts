import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDropDownButtonModule,
  DxToolbarModule,
  DxTabPanelModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  CardNotesModule,
  CardMessagesModule,
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { Task } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { TaskFormModule } from './task-form/task-form.component';

@Component({
  templateUrl: './planning-task-details.component.html',
  styleUrls: ['./planning-task-details.component.scss'],
  providers: [RwaService],
})
export class PlanningTaskDetailsComponent implements OnInit {
  dataSubscription: Subscription;

  task: Task;

  taskId = 1;

  loadData = () => {
    const task$ = this.service.getTask(this.taskId);

    this.dataSubscription = task$.subscribe((data) => {
      this.task = data;
    });
  };

  constructor(private service: RwaService) {
    this.refresh = this.refresh.bind(this);
  }

  refresh = () => this.loadData();

  ngOnInit(): void {
    this.loadData();
  }

  ngonDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}

@NgModule({
  imports: [
    DxDropDownButtonModule,
    DxToolbarModule,
    DxTabPanelModule,
    DxLoadPanelModule,

    CardActivitiesModule,
    CardNotesModule,
    CardMessagesModule,
    TaskFormModule,
    TaskProirityModule,
    TaskStatusModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskDetailsComponent],
})
export class PlanningTaskDetailsModel { }
