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
  DxTextAreaModule,
  DxToolbarModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  TaskProirityModule,
  TaskStatusModule,
  FormItemDateModule,
  FormTextboxModule,
} from 'src/app/shared/components';
import { taskPriorityList, taskStatusList } from 'src/app/shared/types/task';
import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnChanges, OnInit {
  @Input() task: Task;

  isEditing = false;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  isLoading = true;

  isEmptyStartDate = true;

  validationGroup = 'taskFormValidationGroup';

  ngOnInit() {
    this.isEmptyStartDate = !this.task?.startDate;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.task.currentValue;

    if (!this.isLoading) {
      this.isEditing = !this.task?.text;
    }
  }

  handleEditClick = () => {
    this.isEditing = true;
  };

  handleSaveClick = () => {
    this.isEditing = false;
  };

  handleCancelClick = () => {
    this.isEditing = false;
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxFormModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxToolbarModule,
    DxValidatorModule,

    FormTextboxModule,
    TaskProirityModule,
    TaskStatusModule,
    FormItemDateModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent],
})
export class TaskFormModule { }
