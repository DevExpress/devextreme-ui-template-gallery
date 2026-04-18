import React from 'react';
import SpeedDialAction from 'devextreme-react/speed-dial-action';

type ChatFloatingButtonProps = {
  onClick: () => void;
};

export const ChatFloatingButton = ({ onClick }: ChatFloatingButtonProps) => {
  return <SpeedDialAction icon='sparkle' label='AI Inside' onClick={onClick} />;
};
