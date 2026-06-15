import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  DxTextAreaModule,
  DxTextBoxModule,
  DxButtonModule,
  DxToolbarModule,
  DxFileUploaderModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { Message, Messages } from 'src/app/types/messages';
import { UserAvatarComponent } from 'src/app/components/library/user-avatar/user-avatar.component';

@Component({
  selector: 'card-messages',
  templateUrl: './card-messages.component.html',
  styleUrls: ['./card-messages.component.scss'],
  imports: [
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    UserAvatarComponent,
    CommonModule,
  ]
})
export class CardMessagesComponent {
  @Input() user!: string;

  @Input() items?: Messages;

  messageTitle = '';

  messageText = '';

  getAvatarText(name: string) {
    return name.split(' ').map((name) => name[0]).join('');
  }

  getText(data: Message) {
    const items = this.items;
    
    if (!items?.length) {
      return data.text;
    }
    
    const manager = data.manager !== items[0].manager ? items[0].manager : items[1]?.manager ?? items[0].manager;
    return data.text.replace('{username}', manager);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send = (e: any) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newMessage: Message = {
      subject: this.messageTitle,
      text: this.messageText,
      manager: this.user,
      date: new Date(),
    };

    this.items?.push(newMessage);

    e.validationGroup.reset();
  };
}
