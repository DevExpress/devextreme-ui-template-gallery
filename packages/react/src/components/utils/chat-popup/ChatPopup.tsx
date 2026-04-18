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
  const { isXSmall } = useScreenSize();
  const popupContainer = isXSmall ? undefined : '.content';
  const popupPosition: PositionConfig | undefined = isXSmall
    ? undefined
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
      title='AI Data Insights'
      visible={visible}
      width={isXSmall ? '100%' : 420}
      height={isXSmall ? '100%' : 640}
      fullScreen={isXSmall}
      dragEnabled={false}
      hideOnOutsideClick={false}
      shading={false}
      showCloseButton
      resizeEnabled={false}
      container={popupContainer}
      position={popupPosition}
      wrapperAttr={{ class: 'chat-popup' }}
      onVisibleChange={setVisible}
    >
      <ToolbarItem toolbar='top' location='after'>
        <Button
          icon='refresh'
          stylingMode='text'
          hint='Reset chat'
          onClick={onResetClick}
        />
      </ToolbarItem>

      <ToolbarItem toolbar='top' location='after'>
        <Button icon='pin' stylingMode='text' hint='Pin' onClick={onPinClick} />
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
