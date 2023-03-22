import React, { } from 'react';
import classNames from 'classnames';
import Button from 'devextreme-react/button';
import { useScreenSize } from '../../utils/media-query';
import './right-side-panel.scss';

export const RightSidePanel = ({ isOpened, title, toggleOpen, children }) => {

  const { isLarge } = useScreenSize();
  return <>
    <div id='right-panel'>
      <div
        className={classNames({
          'right-sight-panel': true,
          'overlapping': !isLarge,
          'open': isOpened
        })}
      >
        <div className='side-panel-container'>
          <div className='side-panel-header'>
            {title &&
              <div className='side-panel-title'>
                <div className='side-panel-title-text'>
                  {{ title }}
                </div>
              </div>
            }
          </div>

          <div className='side-panel-content-wrapper'>
            {children}
          </div>
        </div>
      </div>
    </div>
    {!isOpened && isLarge && <Button
      className='open-button'
      icon={isOpened ? 'showpanel' : 'hidepanel'}
      onClick={toggleOpen} />
    }
  </>;
};
