import './ChatPopup.scss';

import React, { memo, useCallback, useMemo } from 'react';

import Chat, { ChatTypes } from 'devextreme-react/chat';
import Button from 'devextreme-react/button';
import { Popup, ToolbarItem, Animation } from 'devextreme-react/popup';
import type { PositionConfig } from 'devextreme/animation/position';
import type { AnimationConfig } from 'devextreme/animation/fx';
import { ChatEmptyView, ChatEmptyViewTexts } from '../chat-empty-view/ChatEmptyView';
import { messageRender } from '../chat-message-render/chatMessageRender';
import { useScreenSize } from '../../../utils/media-query';

type ChatPopupProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  messages: ChatTypes.Message[];
  currentUser: ChatTypes.User;
  typingUsers?: ChatTypes.User[];
  alerts?: ChatTypes.Alert[];
  isProcessing?: boolean;
  onMessageEntered: (event: ChatTypes.MessageEnteredEvent) => void;
  onPromptClick: (messageText: string) => void;
  onResetClick: () => void;
  onPinClick: () => void;
};

const POPUP_CONTAINER = '.content';
const PIN_BUTTON_ATTR = { class: 'chat-popup__pin-button' };

export const ChatPopup = memo(({
  visible,
  setVisible,
  messages,
  currentUser,
  typingUsers = [],
  alerts = [],
  isProcessing = false,
  onMessageEntered,
  onPromptClick,
  onResetClick,
  onPinClick,
}: ChatPopupProps) => {
  const { isLarge } = useScreenSize();

  const popupShowAnimation: AnimationConfig = useMemo(() => {
    return {
      duration: isLarge ? 300 : 0,
      from: { scale: 0.55 },
      type: 'pop'
    };
  }, [isLarge]);

  const popupHideAnimation: AnimationConfig = useMemo(() => {
    return {
      duration: isLarge ? 300 : 0,
      from: { opacity: 1, scale: 1 },
      to: { opacity: 0, scale: 0.55 },
      type: 'pop'
    };
  }, [isLarge]);

  const popupPosition = useMemo<PositionConfig>(() => ({
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
  }), []);

  const popupWrapperAttr = useMemo(() => ({ class: 'chat-popup' }), []);

  const renderEmptyView = useCallback(
    (texts: ChatEmptyViewTexts) => (
      <ChatEmptyView texts={texts} onPromptClick={onPromptClick} />
    ),
    [onPromptClick]
  );

  return (
    <Popup
      title='AI Data Insights'
      visible={visible}
      width='min(420px, calc(100% - 64px))'
      height='min(640px, calc(100% - 48px))'
      dragEnabled
      dragAndResizeArea={window.document.body}
      showCloseButton
      shading={false}
      container={POPUP_CONTAINER}
      position={popupPosition}
      wrapperAttr={popupWrapperAttr}
      onVisibleChange={setVisible}
    >
      <Animation show={popupShowAnimation} hide={popupHideAnimation} />
      <ToolbarItem toolbar='top' location='before'>
        <div className='chat-popup__title-section'>
          <span className='chat-card-icon dx-icon dx-icon-sparkle' aria-hidden />
          <div className='chat-popup__title'>AI Data Insights</div>
        </div>
      </ToolbarItem>

      <ToolbarItem toolbar='top' location='after'>
        <Button
          icon='clearformat'
          stylingMode='text'
          hint='Reset chat'
          onClick={onResetClick}
        />
      </ToolbarItem>

      <ToolbarItem toolbar='top' location='after'>
        <Button
          icon='pin'
          stylingMode='text'
          hint='Pin'
          elementAttr={PIN_BUTTON_ATTR}
          onClick={onPinClick}
        />
      </ToolbarItem>

      <div className='chat-popup__body'>
        <Chat
          className={`chat-popup__chat${isProcessing ? ' chat-disabled' : ''}`}
          user={currentUser}
          items={messages}
          typingUsers={typingUsers}
          alerts={alerts}
          height='100%'
          emptyViewRender={renderEmptyView}
          showAvatar={false}
          showDayHeaders={false}
          onMessageEntered={onMessageEntered}
          messageRender={messageRender}
        />
      </div>
    </Popup>
  );
});

ChatPopup.displayName = 'ChatPopup';
