import {
 Component, Input, NgModule, OnInit,
} from '@angular/core';
import { TaskPriority } from 'src/app/shared/types/task';

@Component({
  selector: 'task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss'],
})
export class TaskProirityComponent implements OnInit {
  @Input() value: TaskPriority;

  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [],
  providers: [],
  exports: [TaskProirityComponent],
  declarations: [TaskProirityComponent],
})
export class TaskProirityModule { }
