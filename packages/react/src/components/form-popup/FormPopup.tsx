import React from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ValidationGroup from 'devextreme-react/validation-group';
import { useScreenSize } from './../../utils/media-query';

type PopupProps = {
  title: string,
  visible: boolean,
  changeVisibility: () => void,
}

export const FormPopup = ({ title, visible, changeVisibility, children }: React.PropsWithChildren<PopupProps>) => {
  const { isXSmall, isSmall } = useScreenSize();

  const onSaveClick = (e) => {
    if (!e.validationGroup.validate().isValid) return;

    changeVisibility();
  };

  return (
    <ValidationGroup>
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
            onClick: onSaveClick,
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
    </ValidationGroup>
  );
};
