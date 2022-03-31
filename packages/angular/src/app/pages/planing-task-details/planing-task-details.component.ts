import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxTabPanelModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import {
  ActivitiesModule,
  NotesModule,
  MessagesModule,
  PlanningTaskFormModule,
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { TaskType } from 'src/app/shared/types/TaskType';

@Component({
  // selector: 'app-planing-task-details',
  templateUrl: './planing-task-details.component.html',
  styleUrls: ['./planing-task-details.component.scss']
})
export class PlaningTaskDetailsComponent implements OnInit {
  task: TaskType = {
    id: 0,
    name: 'Call to clarify customer requirements',
    description: 'It\'s a good idea for an employer to maintain a personnel file for each employee.',
    company: 'Super Mart of the West',
    priority: 'Normal',
    status: 'Open',
    startDate: new Date('11/17/2021'),
    dueDate: null,
    owner: 'Brett Johnson'
  };

  activities = [
    {
      name: 'Assigned to Brett Johnson',
      date: '09/26/2021',
      manager: 'Brett Johnson',
    },
    {
      name: 'Open Task',
      date: '09/24/2021',
      manager: 'Brett Johnson',
    }
  ];

  notes: Array<any> | Promise<Array<any>> = [
    {
      date: new Date('09/29/2021'),
      manager: 'Brett Johnson',
      text: 'The first call wasn\'t productive. Their representative didn\'t have much time to talk. I tried to discover if they need our toutch screens, but we decided to meet in person, so I could describe our products in greater details.'
    }
  ];

  messages: Array<any> | Promise<Array<any>> = [
    {
      subject: 'Great news about your equipment upgrade',
      date: new Date('09/29/2021'),
      manager: 'Brett Johnson',
      text: 'Hello {username}, It\'s John. Yesterday we talked about audio equipment upgrade in your company. I have great news for you. We\'ve discussed your requirements and I can offer a 15% discount for your if you plan to order for more than $50000. If you\'d like to get a 3 year contract, then we are ready to offer a 20% discount for you.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.notes = Promise.resolve(this.notes);
    this.messages = Promise.resolve(this.messages);
  }
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxTabPanelModule,
    DxTextAreaModule,

    ActivitiesModule,
    NotesModule,
    MessagesModule,
    PlanningTaskFormModule,
    TaskProirityModule,
    TaskStatusModule,

    CommonModule
  ],
  providers: [],
  exports: [],
  declarations: [PlaningTaskDetailsComponent]
})
export class PlaningTaskDetailsModel { }
