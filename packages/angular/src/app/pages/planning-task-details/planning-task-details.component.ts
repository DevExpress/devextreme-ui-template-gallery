import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxTabPanelModule,
  DxValidationGroupModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import {
  CardActivitiesComponent,
  CardNotesComponent,
  CardMessagesComponent,
} from 'src/app/components';
import { Task } from 'src/app/types/task';
import { DataService } from 'src/app/services';
import { TaskFormComponent } from 'src/app/components/library/task-form/task-form.component';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

@Component({
    templateUrl: './planning-task-details.component.html',
    styleUrls: ['./planning-task-details.component.scss'],
    providers: [ DataService ],
    imports: [
      DxButtonModule,
      DxDropDownButtonModule,
      DxTabPanelModule,
      DxValidationGroupModule,
      DxToolbarModule,

      CardActivitiesComponent,
      CardNotesComponent,
      CardMessagesComponent,
      TaskFormComponent,
      DxScrollViewModule,
      CommonModule,
    ]
})
export class PlanningTaskDetailsComponent implements OnInit {
  private service = inject(DataService);

  task: Task;

  taskId = 1;

  taskName = 'Loading...';

  isLoading = false;

  loadData = () => {
    this.service.getTask(this.taskId).subscribe((data) => {
      this.task = data;
      this.taskName = data.text;
      this.isLoading = false;
    });
  };

  ngOnInit(): void {
    this.loadData();
  }

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  }
}

