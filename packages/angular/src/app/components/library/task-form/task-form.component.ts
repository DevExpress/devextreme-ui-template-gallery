import { Component, Input, OnInit, inject } from '@angular/core';
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
  StatusIndicatorComponent,
  FormItemDateModule,
  FormTextboxModule,
} from 'src/app/components';
import { taskPriorityList, taskStatusList } from 'src/app/types/task';
import { Task } from 'src/app/types/task';
import { getSizeQualifier } from 'src/app/services/screen.service';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ScreenService } from '../../../services';
import { ToolbarFormModule } from 'src/app/components/utils/toolbar-form/toolbar-form.component';

@Component({
    selector: 'task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
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
      StatusIndicatorComponent,
      FormItemDateModule,
      ToolbarFormModule,
      CommonModule,
    ],
})
export class TaskFormComponent implements OnInit {
  protected screen = inject(ScreenService);

  @Input() task: Task;

  @Input() isLoading: boolean = false;

  @Input() isCreateMode: boolean = false;

  savedData: Task = null;

  isEditing = false;

  statusList = taskStatusList;

  priorityList = taskPriorityList;

  getSizeQualifier = getSizeQualifier;

  ngOnInit() {
    this.isEditing = this.isCreateMode;
  }
  handleEditClick = () => {
    this.savedData = { ...this.task }
    this.isEditing = true;
  };

  handleSaveClick = ({ validationGroup }: DxButtonTypes.ClickEvent) => {
    if(!validationGroup.validate().isValid) return;
    this.savedData = null;
    this.isEditing = false;
  };

  handleCancelClick = () => {
    this.task = { ...this.savedData };
    this.isEditing = false;
  };

  getNewTaskData = ()=> ({ ...this.task });
}
