import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/types/status';

@Component({
  selector: 'task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  @Input() value: Status;

  constructor() { }

  spaceToUnderscore = (value: Status) => value.replace(/\ /g, '-');

  ngOnInit() { }
}

@NgModule({
  imports: [ ],
  declarations: [ TaskStatusComponent ],
  exports: [ TaskStatusComponent ],
})
export class TaskStatusModule { }
