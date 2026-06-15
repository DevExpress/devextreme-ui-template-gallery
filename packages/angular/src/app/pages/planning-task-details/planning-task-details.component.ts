import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
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
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import {
  CardActivitiesComponent,
  CardNotesComponent,
  CardMessagesComponent,
} from 'src/app/components';
import { Task } from 'src/app/types/task';
import { DataService } from 'src/app/services';
import { TaskFormComponent } from 'src/app/components/library/task-form/task-form.component';

const DEFAULT_TASK_ID = 1;

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

  private route = inject(ActivatedRoute);

  private location = inject(Location);

  task = signal<Task | undefined>(undefined);

  taskId: number;

  taskName = computed(() => this.task()?.text ?? 'Loading...');

  isLoading = signal(false);

  constructor() {
    const id = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '', 10);
    this.taskId = id || DEFAULT_TASK_ID;
  }

  loadData = () => {
    this.service.getTask(this.taskId).subscribe((data) => {
      this.task.set(data);
      this.isLoading.set(false);
    });
  };

  ngOnInit(): void {
    this.loadData();
  }

  refresh = () => {
    this.isLoading.set(true);
    this.loadData();
  };

  navigateBack(): void {
    this.location.back();
  }
}
