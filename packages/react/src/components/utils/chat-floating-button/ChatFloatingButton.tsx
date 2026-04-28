import React from 'react';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import { useScreenSize } from '../../../utils/media-query';

type ChatFloatingButtonProps = {
  onClick: () => void;
};

export const ChatFloatingButton = ({ onClick }: ChatFloatingButtonProps) => {
  const { isXSmall, isSmall } = useScreenSize();
  const isSmallScreen = isXSmall || isSmall;
  return <SpeedDialAction icon='sparkle' label={isSmallScreen ? undefined : 'AI Inside'} onClick={onClick} />;
};
