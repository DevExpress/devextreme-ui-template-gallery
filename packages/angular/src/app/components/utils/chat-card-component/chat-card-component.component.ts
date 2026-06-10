import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxChatModule } from 'devextreme-angular';
import { DxChatTypes } from 'devextreme-angular/ui/chat';

type Message = DxChatTypes.Message;
type MessageEnteredEvent = DxChatTypes.MessageEnteredEvent;
type User = DxChatTypes.User;
type Alert = DxChatTypes.Alert;

import { ChatEmptyViewComponent } from '../chat-empty-view/chat-empty-view.component';
import { ChatMessageRenderComponent } from '../chat-message-render/chat-message-render.component';

@Component({
  selector: 'chat-card-component',
  templateUrl: './chat-card-component.component.html',
  styleUrls: ['./chat-card-component.component.scss'],
  imports: [
    CommonModule,
    DxButtonModule,
    DxChatModule,
    ChatEmptyViewComponent,
    ChatMessageRenderComponent,
  ],
})
export class ChatCardComponent {
  @Input() messages: Message[] = [];

  @Input() currentUser: User = {};

  @Input() typingUsers: User[] = [];

  @Input() alerts: Alert[] = [];

  @Input() isProcessing = false;

  @Output() messageEntered = new EventEmitter<MessageEnteredEvent>();

  @Output() promptClick = new EventEmitter<string>();

  @Output() resetClick = new EventEmitter<void>();

  @Output() closeClick = new EventEmitter<void>();

  @Output() unpinClick = new EventEmitter<void>();
}
