import {
  Component, NgModule, Input, SimpleChanges, OnChanges,
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
  StatusIndicatorModule,
  FormItemDateModule,
  FormTextboxModule,
} from 'src/app/components';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import { ClickEvent } from 'devextreme/ui/button';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task;

  @Input() contentByScreen: { xs: number, sm: number }

  savedData: Task = null;

  isEditing = false;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  isLoading = true;

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.task.currentValue;

    if (!this.isLoading) {
      this.isEditing = !this.task?.text;
    }
  }

  handleEditClick = () => {
    this.savedData = { ...this.task }
    this.isEditing = true;
  };

  handleSaveClick = ({ validationGroup }: ClickEvent) => {
    if(!validationGroup.validate().isValid) return;
    this.savedData = null;
    this.isEditing = false;
  };

  handleCancelClick = () => {
    this.task = { ...this.savedData };
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
    StatusIndicatorModule,
    FormItemDateModule,
    CommonModule,
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent],
})
export class TaskFormModule { }
