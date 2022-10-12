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
  DxToolbarModule, DxValidatorModule,
} from 'devextreme-angular';
import {
  TaskProirityModule,
  TaskStatusModule,
  FormItemDateModule,
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

  validationGroup = 'contactFormValidationGroup';

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
    DxToolbarModule,
    DxTextAreaModule,
    DxValidatorModule,

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
