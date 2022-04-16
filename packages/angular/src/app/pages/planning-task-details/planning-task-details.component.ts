import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDropDownButtonModule,
  DxToolbarModule,
  DxTabPanelModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { TaskFormModule } from './task-form/task-form.component';
import {
  ActivitiesModule,
  NotesModule,
  MessagesModule,
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { TaskType } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services'
import { Subscription } from 'rxjs';

@Component({
  // selector: 'app-planning-task-details',
  templateUrl: './planning-task-details.component.html',
  styleUrls: ['./planning-task-details.component.scss'],
  providers: [RwaService]
})
export class PlanningTaskDetailsComponent implements OnInit {
  dataSubscription: Subscription;
  task: TaskType;

  taskId = 1;
  isLoading: boolean;

  loadData = () => {
    const task$ = this.service.getTask(this.taskId);

    this.isLoading = true;
    this.dataSubscription = task$.subscribe((data) => {
      this.task = data;

      this.isLoading = false;
    });
  }

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

    ActivitiesModule,
    NotesModule,
    MessagesModule,
    TaskFormModule,
    TaskProirityModule,
    TaskStatusModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskDetailsComponent]
})
export class PlanningTaskDetailsModel { }
