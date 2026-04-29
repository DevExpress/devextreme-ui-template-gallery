import './ChatPopup.scss';

import React from 'react';

import Chat, { ChatTypes } from 'devextreme-react/chat';
import Button from 'devextreme-react/button';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import type { PositionConfig } from 'devextreme/animation/position';

import { useScreenSize } from '../../../utils/media-query';

type ChatPopupProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  messages: ChatTypes.Message[];
  currentUser: ChatTypes.User;
  onMessageEntered: (event: ChatTypes.MessageEnteredEvent) => void;
  onResetClick: () => void;
  onPinClick: () => void;
};

export const ChatPopup = ({
  visible,
  setVisible,
  messages,
  currentUser,
  onMessageEntered,
  onResetClick,
  onPinClick,
}: ChatPopupProps) => {
  const { isLarge } = useScreenSize();
  const isSmallScreen = !isLarge;
  const popupContainer = isSmallScreen ? undefined : '.content';
  const popupPosition: PositionConfig = isSmallScreen
    ? {
      my: 'center',
      at: 'center',
      of: window,
    }
    : {
      my: {
        x: 'right',
        y: 'bottom',
      },
      at: {
        x: 'right',
        y: 'bottom',
      },
      of: '.content',
      offset: '-32 -24',
    };

  return (
    <Popup
      key={isSmallScreen ? 'small' : 'large'}
      title='AI Data Insights'
      visible={visible}
      width={isSmallScreen ? '90%' : 420}
      height={isSmallScreen ? '80%' : 640}
      fullScreen={false}
      dragEnabled
      dragAndResizeArea={window.document.body}
      hideOnOutsideClick={false}
      shading={false}
      showCloseButton
      resizeEnabled={false}
      container={popupContainer}
      position={popupPosition}
      wrapperAttr={{ class: 'chat-popup' }}
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
        <Button icon='pin' stylingMode='text' hint='Pin' disabled={isSmallScreen} onClick={onPinClick} />
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
};
