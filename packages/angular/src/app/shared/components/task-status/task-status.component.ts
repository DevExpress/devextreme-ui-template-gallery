import {
 Component, Input, NgModule, OnInit,
} from '@angular/core';
import { TaskStatus } from 'src/app/shared/types/task';

@Component({
  selector: 'task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss'],
})
export class TaskStatusComponent implements OnInit {
  @Input() value: TaskStatus;

  constructor() { }

  spaceToUnderscore = (value: TaskStatus) => value.replace(/ /g, '-');

  ngOnInit() { }
}

@NgModule({
  imports: [],
  declarations: [TaskStatusComponent],
  exports: [TaskStatusComponent],
})
export class TaskStatusModule { }
