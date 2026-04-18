import './ChatFloatingButton.scss';

import React from 'react';
import Button from 'devextreme-react/button';

type ChatFloatingButtonProps = {
  onClick: () => void;
};

export const ChatFloatingButton = ({ onClick }: ChatFloatingButtonProps) => {
  return (
    <div className='chat-floating-button'>
      <Button
        className='chat-floating-button__button'
        icon='sparkle'
        text='AI Inside'
        type='default'
        stylingMode='contained'
        onClick={onClick}
      />
    </div>
  );
};
