import {
  Component, OnInit, NgModule
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxTabPanelModule,
  DxValidationGroupModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  CardNotesModule,
  CardMessagesModule,
  StatusIndicatorModule,
} from 'src/app/components';
import { Task } from 'src/app/types/task';
import { DataService } from 'src/app/services';
import { TaskFormModule } from 'src/app/components/library/task-form/task-form.component';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

const DEFAULT_TASK_ID = 1;


@Component({
  templateUrl: './planning-task-details.component.html',
  styleUrls: ['./planning-task-details.component.scss'],
  providers: [DataService],
})
export class PlanningTaskDetailsComponent implements OnInit {
  task: Task;

  taskId: number;

  taskName = 'Loading...';

  isLoading = false;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.taskId = id ? parseInt(id, 10) : DEFAULT_TASK_ID;
  }

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

  navigateBack(): void {
    this.location.back()
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxTabPanelModule,
    DxValidationGroupModule,
    DxToolbarModule,

    CardActivitiesModule,
    CardNotesModule,
    CardMessagesModule,
    TaskFormModule,
    StatusIndicatorModule,
    DxScrollViewModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskDetailsComponent],
})
export class PlanningTaskDetailsModule { }
