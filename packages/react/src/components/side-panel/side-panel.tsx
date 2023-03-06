/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useScreenSize } from '../../utils/media-query';
import Button from 'devextreme-react/button';
import './side-panel.scss';
interface SidePanelProps {
  side: 'left' | 'right'
  icon?: string
}
export const SidePanel = ({ side, icon, children }: React.PropsWithChildren<SidePanelProps>) => {
  const { isXSmall, isSmall } = useScreenSize();
  const [isOpened, setIsOpened] = useState(true);
  return <>
    {(isXSmall || isSmall) && <Button className='open-button' icon={icon || 'hidepanel'} onClick={() => setIsOpened(!isOpened)} />}
    <div
      id='contact-panel'
      className={classNames({
        'side-panel': true,
        'active': isXSmall || isSmall,
        'open': isOpened,
        'side-left': side === 'left',
        'side-right': side === 'right'
      })}
    >
      {children}
    </div>
  </>;
};
