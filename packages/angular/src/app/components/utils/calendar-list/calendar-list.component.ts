import {
  Component, NgModule, EventEmitter, Output, Input, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DxButtonModule, DxCheckBoxModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxButtonTypes } from 'devextreme-angular/ui/button';

@Component({
    selector: 'calendar-list',
    templateUrl: './calendar-list.component.html',
    styleUrls: ['./calendar-list.component.scss'],
    standalone: false
})
export class CalendarListComponent implements OnInit {
  @Input() dataSource: Record<string, any>[];

  @Output() listSelectionChanged = new EventEmitter<any>();

  selectedItems = [];

  constructor() {}

  ngOnInit() {
    this.selectedItems = [...this.dataSource.flatMap((el) => el.items)];
  }

  selectionChanged(item, isSelected) {
    const selected = this.selectedItems;
    this.selectedItems = isSelected ? [...selected, item] :  selected.filter((el) => el !== item);
    this.listSelectionChanged.emit(this.selectedItems);
  }
}

@NgModule({ exports: [CalendarListComponent],
  declarations: [CalendarListComponent],
  imports: [DxListModule,
        DxCheckBoxModule,
        DxButtonModule,
        CommonModule],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class CalendarListModule { }
