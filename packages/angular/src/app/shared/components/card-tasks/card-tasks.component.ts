import {
  Component, Input, NgModule, OnChanges, OnInit, SimpleChanges, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { Task } from '../../types/task';

@Component({
  selector: 'card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.scss'],
})
export class CardTasksComponent implements OnChanges {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

  @Input() tasks: Task[];

  @Input() manager: string;

  isLoading = true;

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = changes.tasks?.currentValue === null;
  }
}

@NgModule({
  imports: [DxDataGridModule, DxLoadPanelModule, CommonModule],
  declarations: [CardTasksComponent],
  exports: [CardTasksComponent],
})
export class CardTasksModule { }
