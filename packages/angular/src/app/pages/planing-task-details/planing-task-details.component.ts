import { Component, OnInit, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxToolbarModule,
  DxDropDownButtonModule,
  DxDropDownBoxModule
} from 'devextreme-angular';

@Component({
  // selector: 'app-planing-task-details',
  templateUrl: './planing-task-details.component.html',
  styleUrls: ['./planing-task-details.component.scss']
})
export class PlaningTaskDetailsComponent implements OnInit {

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxToolbarModule,
    DxDropDownButtonModule,
    DxDropDownBoxModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskDetailsComponent]
})
export class PlaningTaskDetailsModel { }
