import React from 'react';
import classNames from 'classnames';
import { useScreenSize } from '../../../utils/media-query';
import Button from 'devextreme-react/button';
import './right-side-panel.scss';

export const RightSidePanel = ({ showOpenButton = true, isOpened, toggleOpen, children }) => {
  const { isXSmall, isLarge } = useScreenSize();
  return <>
    <div
      id='right-side-panel'
      className={classNames({
        'right-side-panel': true,
        'overlap': !isLarge,
        'x-small': isXSmall,
        'open': isOpened,
      })}
    >
      {children}
    </div>
    {isLarge && showOpenButton &&
      <Button
        className={classNames({
          'right-panel-open-button': true,
          'hidden': isOpened,
        })}
        icon='panelright'
        onClick={toggleOpen}
      />
    }
  </>;
};
