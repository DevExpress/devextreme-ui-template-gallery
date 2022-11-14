import React from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { useScreenSize } from './../../utils/media-query';

export const FormPopup = ({ title, children, visible, changeVisibility }) => {

  const { isXSmall, isSmall } = useScreenSize();

  return (
    <Popup
      title={title}
      visible={visible}
      fullScreen={isXSmall || isSmall}
      width='auto'
      height='auto'
    >
      <ToolbarItem
        widget='dxButton'
        toolbar='bottom'
        location='after'
        options={{
          text: 'Save',
          stylingMode: 'outlined',
          type: 'default',
          onClick: changeVisibility,
        }}
      />
      <ToolbarItem
        widget='dxButton'
        toolbar='bottom'
        location='after'
        options={{
          text: 'Cancel',
          stylingMode: 'text',
          type: 'default',
          onClick: changeVisibility,
        }}
      />

      {children}
    </Popup>
  );
};
