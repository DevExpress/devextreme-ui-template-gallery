import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule,
} from '@angular/core';
import {
  DxTextAreaModule,
  DxTextBoxModule,
  DxButtonModule,
  DxToolbarModule,
  DxFileUploaderModule,
  DxScrollViewModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { Message, Messages } from 'src/app/types/messages';

@Component({
  selector: 'card-messages',
  templateUrl: './card-messages.component.html',
  styleUrls: ['./card-messages.component.scss'],
})
export class CardMessagesComponent {
  @Input() user: string;

  @Input() items: Messages;

  messageTitle = '';

  messageText = '';

  getAvatarText(name: string) {
    return name.split(' ').map((name) => name[0]).join('');
  }

  setUserName(text: string) {
    return text.replace('{username}', this.user);
  }

  send = (e) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newMessage: Message = {
      subject: this.messageTitle,
      text: this.messageText,
      manager: this.user,
      date: new Date(),
    };

    this.items.push(newMessage);

    e.validationGroup.reset();
  };
}

@NgModule({
  imports: [
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxScrollViewModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    CommonModule,
  ],
  declarations: [CardMessagesComponent],
  exports: [CardMessagesComponent],
})
export class CardMessagesModule { }
