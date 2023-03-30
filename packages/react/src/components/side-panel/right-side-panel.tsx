/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useScreenSize } from '../../utils/media-query';
import Button from 'devextreme-react/button';
import './right-side-panel.scss';
interface SidePanelProps {
  icon?: string,
  toggleOpen: () => void,
  isOpened: boolean,
}
export const RightSidePanel = ({ isOpened, toggleOpen, children }: React.PropsWithChildren<SidePanelProps>) => {
  const { isXSmall, isSmall, isMedium, isLarge } = useScreenSize();
  return <>
    <div
      id='side-panel'
      className={classNames({
        'side-panel': true,
        'overlap': !isLarge,
        'x-small': isXSmall,
        'open': isOpened,
      })}
    >
      {children}
    </div>
    {isLarge &&
      <Button
        className={classNames({
          'open-button': true,
          'hidden': isOpened,
        })}
        icon='hidepanel'
        onClick={toggleOpen} />}
  </>;
};
