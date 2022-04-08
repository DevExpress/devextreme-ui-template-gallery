import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxTabPanelModule,
  DxTextAreaModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import {
  ActivitiesModule,
  NotesModule,
  MessagesModule,
  PlanningTaskFormModule,
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { task } from 'src/app/shared/types/task';
import { getTask } from 'dx-rwa-data';

@Component({
  // selector: 'app-planing-task-details',
  templateUrl: './planing-task-details.component.html',
  styleUrls: ['./planing-task-details.component.scss']
})
export class PlaningTaskDetailsComponent implements OnInit {
  task: any;


  taskId = 1;
  load = true;

  constructor() { 
    this.refresh = this.refresh.bind(this);

    getTask(this.taskId).then((data) => {
      this.task = data;
      this.load = false;
    });
  }

  refresh() {
    this.load = true;
    getTask(this.taskId).then((data) => {
      this.task = data;
      this.load = false;
    });
  }

  ngOnInit(): void {

  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxTabPanelModule,
    DxTextAreaModule,
    DxLoadPanelModule,

    ActivitiesModule,
    NotesModule,
    MessagesModule,
    PlanningTaskFormModule,
    TaskProirityModule,
    TaskStatusModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskDetailsComponent]
})
export class PlaningTaskDetailsModel { }
