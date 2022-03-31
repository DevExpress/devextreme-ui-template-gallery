import { Component, OnInit, NgModule, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxToolbarModule,
  DxFormModule,
  DxDropDownButtonModule,
  DxCalendarModule,

  DxDropDownButtonComponent,
} from 'devextreme-angular';
import {
  TaskProirityModule,
  TaskStatusModule,
} from '../';
import { priorityList } from 'src/app/shared/types/priorety';
import { statusList } from 'src/app/shared/types/statuses';
import { TaskType } from 'src/app/shared/types/TaskType';

@Component({
  selector: 'app-planning-task-form',
  templateUrl: './planning-task-form.component.html',
  styleUrls: ['./planning-task-form.component.scss']
})
export class PlanningTaskFormComponent implements OnInit {
  @ViewChild('dropDownButtonDueDate') dropDownButtonDueDate: DxDropDownButtonComponent;
  @ViewChild('dropDownButtonStartDate') dropDownButtonStartDate: DxDropDownButtonComponent;

  @Input() task: TaskType;

  edit = false;
  statusList = statusList;
  priorityList = priorityList;

  isEmptyStartDate: boolean;
  isEmptyDueDate: boolean;

  isEmpty = (value: any): boolean => value === undefined || value === null

  parseDate = (date: Date) => `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

  toggleEdit() {
    this.edit = !this.edit;
  }

  changeDate = (e) => {
    const { value, component } = e;
    const dateName = component.option('name');

    const closeDropDownButton = (component: DxDropDownButtonComponent) => {
      if(this.isEmpty(component)) return;
      component.instance.close();
    }

    if(dateName === 'Start Date') {
      this.task.startDate = new Date(value);
      this.isEmptyStartDate = this.isEmpty(value);
      closeDropDownButton(this.dropDownButtonStartDate);
    } else  if(dateName === 'Due Date') {
      this.task.dueDate = new Date(value);
      this.isEmptyDueDate = this.isEmpty(value);
      closeDropDownButton(this.dropDownButtonDueDate);
    }
  }
  
  constructor() {
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  
  ngOnInit() {
    this.isEmptyStartDate = this.isEmpty(this.task.startDate);
    this.isEmptyDueDate = this.isEmpty(this.task.dueDate);
  }
}

@NgModule({
  imports: [
    DxToolbarModule,
    DxFormModule,
    DxDropDownButtonModule,
    DxCalendarModule,

    TaskProirityModule,
    TaskStatusModule,

    CommonModule
  ],
  providers: [],
  exports: [PlanningTaskFormComponent],
  declarations: [PlanningTaskFormComponent]
})
export class PlanningTaskFormModule { }
