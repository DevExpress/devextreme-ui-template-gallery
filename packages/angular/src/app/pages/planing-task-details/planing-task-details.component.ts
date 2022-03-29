import { Component, OnInit, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxToolbarModule,
  DxDropDownButtonModule,
  DxFormModule
} from 'devextreme-angular';
import {
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { ValueChangedEvent as ValeChangedDateBox } from 'devextreme/ui/date_box'
import { statusList } from 'src/app/shared/types/statuses';
import { priorityList } from 'src/app/shared/types/priorety';
import { TaskType } from 'src/app/shared/types/TaskType';

@Component({
  // selector: 'app-planing-task-details',
  templateUrl: './planing-task-details.component.html',
  styleUrls: ['./planing-task-details.component.scss']
})
export class PlaningTaskDetailsComponent implements OnInit {

  constructor() {
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  isEmpty = (data: any): boolean => data === undefined || data === null

  edit = false;
  statusList = statusList;
  priorityList = priorityList;

  task: TaskType = {
    id: 0,
    name: 'Call to clarify customer requirements',
    description: 'It\'s a good idea for an employer to maintain a personnel file for each employee.',
    company: 'Super Mart of the West',
    priority: 'Normal',
    status: 'Open',
    startDate: new Date('11/17/2021'),
    dueDate: null,
    owner: 'Brett Johnson'
  };
  
  isEmptyStartDate = this.isEmpty(this.task.startDate);
  isEmptyDueDate = this.isEmpty(this.task.dueDate);

  changeDate = (e: ValeChangedDateBox) => {
    const { value, component } = e;
    const dateName = component.option('name');

    if(dateName === 'Start Date') {
      this.isEmptyStartDate = this.isEmpty(value);
    }
    if(dateName === 'Due Date') {
      this.isEmptyDueDate = this.isEmpty(value);
    }
  }

  toggleEdit() {
    this.edit = !this.edit;
  }
  
  parseDate = (date: Date) => `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxToolbarModule,
    DxDropDownButtonModule,
    DxFormModule,

    TaskProirityModule,
    TaskStatusModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskDetailsComponent]
})
export class PlaningTaskDetailsModel { }
