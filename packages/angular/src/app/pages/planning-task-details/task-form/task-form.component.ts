import {
 Component, OnInit, NgModule, Input, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxCalendarModule,
  DxDropDownButtonModule,
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
  TaskFormDateModule,
} from 'src/app/shared/components';
import { priorityList } from 'src/app/shared/types/priority';
import { statusList } from 'src/app/shared/types/status';
import { Task } from 'src/app/shared/types/task';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task;

  statusList = statusList;

  priorityList = priorityList;

  isEditing: boolean;

  isLoading: boolean;

  isEmptyStartDate: boolean;

  isEmptyDueDate: boolean;

  stylingMode: TextBoxProperties['stylingMode'];

  editorOptions: TextBoxProperties;

  isEmpty = (value: any): boolean => value === undefined || value === null;

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.setEditorMode(this.isEditing);
  }

  constructor() {
    this.editorOptions = { };

    this.isEditing = false;
    this.isLoading = true;

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  ngOnInit() {
    this.setEditorMode(this.isEditing);

    this.isEmptyStartDate = this.isEmpty(this.task?.startDate);
    this.isEmptyDueDate = this.isEmpty(this.task?.dueDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = changes.task.currentValue === undefined;

    if (!this.isLoading) {
      this.isEmptyStartDate = this.isEmpty(this.task?.startDate);
      this.isEmptyDueDate = this.isEmpty(this.task?.dueDate);
    }
  }

  setEditorMode = (isEditing: boolean) => {
    this.stylingMode = isEditing ? 'filled' : 'underlined';
    this.editorOptions = {
      stylingMode: this.stylingMode,
    };
  };

  dateChanged = (e: { date: Date, type: string }) => {
    const { date, type } = e;

    if (type === 'start') {
      this.task.startDate = e.date;
      this.isEmptyStartDate = this.isEmpty(date);
    } else if (type === 'due') {
      this.task.dueDate = date;
      this.isEmptyDueDate = this.isEmpty(date);
    }
  };
}

@NgModule({
  imports: [
    DxCalendarModule,
    DxDropDownButtonModule,
    DxFormModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,

    TaskProirityModule,
    TaskStatusModule,
    TaskFormDateModule,

    CommonModule,
  ],
  providers: [],
  exports: [TaskFormComponent],
  declarations: [TaskFormComponent],
})
export class TaskFormModule { }
