import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxListModule } from 'devextreme-angular/ui/list';
import { Task } from 'src/app/types/task';
import { AgendaListItemModule } from "../agenda-list-item/agenda-list-item.component";

@Component({
  selector: 'agenda',
  template: `
  <dx-list [dataSource]="tasks">
    <div *dxTemplate="let task of 'item'"
         class="agenda-item"
    >
      <agenda-list-item class="" [appointment]="task" [resources]="resources"></agenda-list-item>
    </div>
  </dx-list>
`,
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent {
  @Input() tasks: Task[];

  @Input() resources: Record<string,any>[];
}

@NgModule({
  imports: [
    CommonModule,
    DxListModule,
    AgendaListItemModule,
  ],
  declarations: [AgendaComponent],
  exports: [AgendaComponent],
})
export class AgendaModule { }
