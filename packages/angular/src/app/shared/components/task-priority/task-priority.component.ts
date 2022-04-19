import {
 Component, Input, NgModule, OnInit,
} from '@angular/core';
import { Priority } from 'src/app/shared/types/priority';

@Component({
  selector: 'task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss'],
})
export class TaskProirityComponent implements OnInit {
  @Input() value: Priority;

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
