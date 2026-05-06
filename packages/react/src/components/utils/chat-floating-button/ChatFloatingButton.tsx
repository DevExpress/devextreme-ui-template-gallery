import React from 'react';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import { useScreenSize } from '../../../utils/media-query';

type ChatFloatingButtonProps = {
  onClick: () => void;
};

export const ChatFloatingButton = ({ onClick }: ChatFloatingButtonProps) => {
  const { isLarge } = useScreenSize();
  const isSmallScreen = !isLarge;
  return (
    <SpeedDialAction
      icon='sparkle'
      label={isSmallScreen ? '' : 'AI Inside'}
      onClick={onClick}
    />
  );
};
