import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  DxTextAreaModule,
  DxToolbarModule,
} from 'devextreme-angular';

type Message = {
  manager: string,
  subject: string,
  date: string | Date,
  text: string
};

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input() userName: string;

  @Input() items: Message[];

  constructor() {
  }

  getAvatarText(name: string) {
    return name.split(' ').map(name => name[0]).join('');
  }

  setUserName(text: string) {
    return text.replace('{username}', this.userName);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [ 
    DxTextAreaModule,
    DxToolbarModule,

    CommonModule
  ],
  declarations: [ MessagesComponent ],
  exports: [ MessagesComponent ]
})
export class MessagesModule { }