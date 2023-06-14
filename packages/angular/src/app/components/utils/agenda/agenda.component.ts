import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';
import { Task } from 'src/app/types/task';
import { AgendaListItemModule } from "./agenda-list-item.component";

export type AgendaItem = { startDate: Date };

@Component({
  selector: 'agenda',
  template: `
  <dx-list
    [dataSource]="items"
    (onItemClick)="handleItemClick($event)"
  >
    <div
      *dxTemplate="let task of 'item'"
      class="agenda-item"
    >
      <agenda-list-item
        [appointment]="task"
        [resources]="resources">
      </agenda-list-item>
    </div>
  </dx-list>
`,
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent {
  @Input() items: AgendaItem[];

  @Input() resources: Record<string,any>[];

  @Output() clickAppointment = new EventEmitter<{ itemData: Task, element: EventTarget }>();

  handleItemClick(e: DxListTypes.ItemClickEvent) {
    const { itemData, element } = e;
    this.clickAppointment.emit({itemData, element});
  }
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
