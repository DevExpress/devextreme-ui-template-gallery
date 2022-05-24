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
import { Properties as TextBoxProperties } from 'devextreme/ui/text_box';
import {
  TaskProirityModule,
  TaskStatusModule,
  FormItemDateModule,
  FormItemBlueModule,
} from 'src/app/shared/components';
import { taskPriorityList, taskStatusList } from 'src/app/shared/types/task';
import { Task } from 'src/app/shared/types/task';

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

  isEmptyDueDate = true;

  stylingMode = 'underlined';

  editorOptions = { stylingMode: this.stylingMode };

  ngOnInit() {
    this.setEditorMode(this.isEditing);

    this.isEmptyStartDate = !this.task?.startDate;
    this.isEmptyDueDate = !this.task?.dueDate;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.task.currentValue;

    if (!this.isLoading) {
      this.task.dueDate = null;

      this.isEmptyStartDate = !this.task?.startDate;
      this.isEmptyDueDate = !this.task?.dueDate;
    }
  }

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
    this.setEditorMode(this.isEditing);
  };

  setEditorMode = (isEditing: boolean) => {
    this.stylingMode = isEditing ? 'filled' : 'underlined';
    this.editorOptions = {
      stylingMode: this.stylingMode,
    };
  };

  startDateChange = (date: Date) => {
    this.isEmptyStartDate = !date;
  };

  dueDateChange = (date: Date) => {
    this.isEmptyDueDate = !date;
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

    TaskProirityModule,
    TaskStatusModule,
    FormItemDateModule,
    FormItemBlueModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent],
})
export class TaskFormModule { }
