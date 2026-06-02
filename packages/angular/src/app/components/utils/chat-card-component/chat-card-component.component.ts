import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxChatModule } from 'devextreme-angular';
import { DxChatTypes } from 'devextreme-angular/ui/chat';

type Message = DxChatTypes.Message;
type MessageEnteredEvent = DxChatTypes.MessageEnteredEvent;
type User = DxChatTypes.User;

import { ChatEmptyViewComponent } from '../chat-empty-view/chat-empty-view.component';

@Component({
  selector: 'chat-card-component',
  templateUrl: './chat-card-component.component.html',
  styleUrls: ['./chat-card-component.component.scss'],
  imports: [
    CommonModule,
    DxButtonModule,
    DxChatModule,
    ChatEmptyViewComponent,
  ],
})
export class ChatCardComponent {
  @Input() messages: Message[] = [];

  @Input() currentUser: User = {};

  @Output() messageEntered = new EventEmitter<MessageEnteredEvent>();

  @Output() promptClick = new EventEmitter<string>();

  @Output() resetClick = new EventEmitter<void>();

  @Output() closeClick = new EventEmitter<void>();

  @Output() unpinClick = new EventEmitter<void>();
}
