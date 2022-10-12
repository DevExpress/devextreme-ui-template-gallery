import {
  Component, OnInit, NgModule, Input, SimpleChanges, OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import {
  TaskProirityModule,
  TaskStatusModule,
  FormItemDateModule,
  EditViewItemModule,
} from 'src/app/shared/components';
import { taskPriorityList, taskStatusList } from 'src/app/shared/types/task';
import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task;

  isEditing = false;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  isLoading = true;

  validationGroup = 'taskFormValidationGroup';

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
    DxToolbarModule,
    DxTextAreaModule,
    DxDateBoxModule,

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
