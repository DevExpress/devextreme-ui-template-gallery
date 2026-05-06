import './ChatPopup.scss';

import React, { memo, useMemo } from 'react';

import Chat, { ChatTypes } from 'devextreme-react/chat';
import Button from 'devextreme-react/button';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import type { PositionConfig } from 'devextreme/animation/position';

type ChatPopupProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  messages: ChatTypes.Message[];
  currentUser: ChatTypes.User;
  onMessageEntered: (event: ChatTypes.MessageEnteredEvent) => void;
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
  onMessageEntered,
  onResetClick,
  onPinClick,
}: ChatPopupProps) => {
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

  return (
    <Popup
      title='AI Data Insights'
      visible={visible}
      width='min(420px, calc(100% - 64px))'
      height='min(640px, calc(100% - 48px))'
      fullScreen={false}
      dragEnabled
      dragAndResizeArea={window.document.body}
      hideOnOutsideClick={false}
      shading={false}
      showCloseButton
      resizeEnabled={false}
      container={POPUP_CONTAINER}
      position={popupPosition}
      wrapperAttr={popupWrapperAttr}
      onVisibleChange={setVisible}
    >
      <ToolbarItem toolbar='top' location='before'>
        <div className='chat-popup__title-section'>
          <div className='chat-popup__icon'>
            <span className='dx-icon-sparkle' />
          </div>
          <div className='chat-popup__title'>AI Data Insights</div>
        </div>
      </ToolbarItem>

      <ToolbarItem toolbar='top' location='after'>
        <Button
          icon='refresh'
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
          className='chat-popup__chat'
          user={currentUser}
          items={messages}
          height='100%'
          showAvatar={false}
          showDayHeaders={false}
          onMessageEntered={onMessageEntered}
        />
      </div>
    </Popup>
  );
});

ChatPopup.displayName = 'ChatPopup';
