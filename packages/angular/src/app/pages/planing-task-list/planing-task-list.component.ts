import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTabsModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxProgressBarModule,
  DxTabsComponent
} from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  // selector: 'app-planing-task-list',
  templateUrl: './planing-task-list.component.html',
  styleUrls: ['./planing-task-list.component.scss']
})
export class PlaningTaskListComponent implements OnInit {
  data = [
    {
      id: 1,
      name: 'Task Name',
      date: new Date(Date.now()),
      owner: 'First Last',
      priority: 'Normal',
      status: 'Open',
      estimated: '0:00',
      consumed: '-',
      progress: 30
    },
    {
      id: 2,
      priority: 'Low',
      status: 'In progress',
      progress: 0
    },
    {
      id: 3,
      priority: 'Hight',
      status: 'Waiting for data',
      progress: 100
    },
    {
      id: 4,
      priority: 'Low',
      status: 'Canceled',
      progress: 25
    },
    {
      id: 5,
      priority: 'Normal',
      status: 'Done',
      progress: 5
    }
  ];
  dataSource: DataSource;

  tabPanelItems: DxTabsComponent['items'] = [
    {
      text: 'List'
    },
    {
      text: 'Kanban Board'
    },
    {
      text: 'Gantt'
    }
  ];

  displayTaskComponent: string = this.tabPanelItems[0].text;

  constructor() {
    this.dataSource = new DataSource({
      key: 'id',
      store: new ArrayStore({
        data: this.data,
      })
    });
  }

  getJoinClass = (value) => value.replace(/\ /g, '-');

  customizeHyphetText = (cellInfo) => cellInfo.value ?? '-';

  customizeDateText = (cellInfo) => {
    if(!cellInfo.value) return this.customizeHyphetText(cellInfo);

    const date: Date = new Date(cellInfo.value);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  tabValueChange = (e) => {
    const { itemData } = e;
    this.displayTaskComponent = itemData.text;
  }

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxProgressBarModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskListComponent]
})
export class PlaningTaskListModule { }
