import { Component, ViewChild, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxTabsModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxDropDownButtonModule,
  DxTabPanelModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTileViewModule,
  DxToolbarModule,
} from 'devextreme-angular';

@Component({
  // selector: 'app-planing-task-list',
  templateUrl: './planing-task-list.component.html',
  styleUrls: ['./planing-task-list.component.scss']
})
export class PlaningTaskListComponent implements OnInit {

  constructor() {
  }

  load = true;

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxTabsModule,
    DxFormModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxDropDownButtonModule,
    DxTabPanelModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxTileViewModule,
    DxToolbarModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskListComponent]
})
export class PlaningTaskListModule { }
