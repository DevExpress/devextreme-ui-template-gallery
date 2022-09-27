import {
  Component, OnInit, NgModule, Input, SimpleChanges, OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import {
  TaskProirityModule,
  TaskStatusModule,
  FormItemDateModule,
  EditViewItemModule,
} from 'src/app/shared/components';
import { taskPriorityList, taskStatusList } from 'src/app/shared/types/task';
import { Task } from 'src/app/shared/types/task';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task: Task;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  isEditing = false;

  isLoading = true;

  isEmptyStartDate = true;

  ngOnInit() {
    this.isEmptyStartDate = !this.task?.startDate;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.task.currentValue;

    if (!this.isLoading) {
      this.task.dueDate = null;
      this.isEmptyStartDate = !this.task?.startDate;
    }
  }

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
  };

  startDateChange = (date: Date) => {
    this.isEmptyStartDate = !date;
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxFormModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxTextAreaModule,

    TaskProirityModule,
    TaskStatusModule,
    FormItemDateModule,
    EditViewItemModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent],
})
export class TaskFormModule { }
