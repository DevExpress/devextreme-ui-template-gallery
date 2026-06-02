import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxChatModule,
  DxPopupModule,
} from 'devextreme-angular';
import type {
  AnimationConfig,
  PositionConfig,
} from 'devextreme/common/core/animation';
import { DxChatTypes } from 'devextreme-angular/ui/chat';

type Message = DxChatTypes.Message;
type MessageEnteredEvent = DxChatTypes.MessageEnteredEvent;
type User = DxChatTypes.User;
import { Subscription } from 'rxjs';

import { ScreenService } from 'src/app/services';
import { ChatEmptyViewComponent } from '../chat-empty-view/chat-empty-view.component';

type PopupAnimation = {
  show: AnimationConfig;
  hide: AnimationConfig;
};

const POPUP_CONTAINER = '.content';

@Component({
  selector: 'chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss'],
  imports: [
    CommonModule,
    DxButtonModule,
    DxChatModule,
    DxPopupModule,
    ChatEmptyViewComponent,
  ],
})
export class ChatPopupComponent implements OnDestroy {
  @Input() visible = false;

  @Input() messages: Message[] = [];

  @Input() currentUser: User = {};

  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() messageEntered = new EventEmitter<MessageEnteredEvent>();

  @Output() promptClick = new EventEmitter<string>();

  @Output() resetClick = new EventEmitter<void>();

  @Output() pinClick = new EventEmitter<void>();

  private screen = inject(ScreenService);

  private isLarge = this.screen.sizes['screen-large'];

  private screenSubscription: Subscription = this.screen.screenChanged.subscribe(({
    isLarge,
    isXLarge,
  }) => {
    this.isLarge = isLarge || isXLarge;
    this.popupAnimation = this.createPopupAnimation();
  });

  popupContainer = POPUP_CONTAINER;

  popupWrapperAttr = { class: 'chat-popup' };

  pinButtonAttr = { class: 'chat-popup__pin-button' };

  dragAndResizeArea = 'body';

  popupPosition: PositionConfig = {
    my: {
      x: 'right',
      y: 'bottom',
    },
    at: {
      x: 'right',
      y: 'bottom',
    },
    of: POPUP_CONTAINER,
    offset: '-32 -24',
  };

  popupAnimation: PopupAnimation = this.createPopupAnimation();

  ngOnDestroy(): void {
    this.screenSubscription.unsubscribe();
  }

  onVisibleChange(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  private createPopupAnimation(): PopupAnimation {
    const duration = this.isLarge ? 300 : 0;

    return {
      show: {
        duration,
        from: { scale: 0.55 },
        type: 'pop',
      },
      hide: {
        duration,
        from: { opacity: 1, scale: 1 },
        to: { opacity: 0, scale: 0.55 },
        type: 'pop',
      },
    };
  }
}
