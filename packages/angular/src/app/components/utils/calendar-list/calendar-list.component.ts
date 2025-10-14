import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxCheckBoxModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular/ui/list';

@Component({
  selector: 'calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
  imports: [
    DxListModule,
    DxCheckBoxModule,
    DxButtonModule,
    CommonModule
  ],
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
