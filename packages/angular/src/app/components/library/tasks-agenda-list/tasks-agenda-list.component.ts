import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxListModule } from 'devextreme-angular/ui/list';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'tasks-agenda-list',
  template: `
  <dx-list [dataSource]="tasks">
    <div *dxTemplate="let task of 'item'"
         class="task-agenda"
    >
      <div class='time'>
        <div class='start'>{{task.startDate| date: 'hh:mm'}}</div>
       <!-- <div className='duration'>{{
          task.endDate - task.startDate
          }}</div>
          -->
      </div>
      <div class="task-content">
        <div class="task-title">{{ task.text }}</div>
        <div class="task-description">{{ task.description }}</div>
      </div>
    </div>
  </dx-list>
`,
  styleUrls: ['./tasks-agenda-list.component.scss'],
})
export class TasksAgendaListComponent {
  @Input() tasks: Task[];
}

@NgModule({
  imports: [
    CommonModule,
    DxListModule
  ],
  declarations: [TasksAgendaListComponent],
  exports: [TasksAgendaListComponent],
})
export class TasksAgendaListModule { }
