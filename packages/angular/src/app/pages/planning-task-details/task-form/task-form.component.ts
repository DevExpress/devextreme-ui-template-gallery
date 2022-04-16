import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxToolbarModule,
  DxFormModule,
  DxDropDownButtonModule,
  DxCalendarModule,
} from 'devextreme-angular';
import { ValueChangedEvent as DateBoxValueChangedEvent } from 'devextreme/ui/date_box';
import {
  TaskProirityModule,
  TaskStatusModule,
  TaskFromDateModule,
} from 'src/app/shared/components';
import { priorityList } from 'src/app/shared/types/priority';
import { statusList } from 'src/app/shared/types/status';
import { TaskType } from 'src/app/shared/types/task';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task: TaskType;

  edit = false;
  statusList = statusList;
  priorityList = priorityList;

  isEmptyStartDate: boolean;
  isEmptyDueDate: boolean;

  isEmpty = (value: any): boolean => value === undefined || value === null;

  toggleEdit() {
    this.edit = !this.edit;
  }

  dateChanged = (e: { date: Date, type: string }) => {
    const { date, type } = e;

    if(type === 'Start') {
      this.task.startDate = e.date;
      this.isEmptyStartDate = this.isEmpty(date);
    } else  if(type === 'Due') {
      this.task.dueDate = date;
      this.isEmptyDueDate = this.isEmpty(date);
    }
  }

  dateBoxValueChanged = (e: DateBoxValueChangedEvent) => {
    const { value, component } = e;

    this.dateChanged({
      date: value,
      type: component.option('name')
    });
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
    TaskFromDateModule,

    CommonModule
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent]
})
export class TaskFormModule { }
