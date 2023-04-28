import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'devextreme-react/button';
import { useScreenSize } from '../../../utils/media-query';
import './left-side-panel.scss';
import { ScrollView } from 'devextreme-react';

export const LeftSidePanel = ({ children }) => {
  const { isXSmall, isSmall, isMedium, isLarge } = useScreenSize();
  const [isOpened, setIsOpened] = useState(isMedium || isLarge);

  return <div
    id='left-side-panel'
    className={classNames({
      'left-side-panel': true,
      'overlapping': isXSmall || isSmall,
      'open': isOpened || isMedium || isLarge,
    })}
  >
    <div className='side-panel-container'>
      {(isXSmall || isSmall) &&
        <div className='button-container'>
          <Button
            className='open-button'
            icon={isOpened ? 'hidepanel' : 'showpanel'}
            onClick={() => { setIsOpened(!isOpened); }}
          />
        </div>
      }
      <div className='side-panel-content-wrapper'>
        <ScrollView>
          {children}
        </ScrollView>
      </div>
    </div>
  </div>;
};
