import React, { useRef } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ValidationGroup from 'devextreme-react/validation-group';
import { useScreenSize } from '../../utils/media-query';

type PopupProps = {
  title: string,
  visible: boolean,
  changeVisibility: () => void,
}

export const FormPopup = ({ title, visible, changeVisibility, children }: React.PropsWithChildren<PopupProps>) => {
  const { isXSmall, isSmall } = useScreenSize();
  const validationGroup = useRef<ValidationGroup>(null);

  const onCancelClick = () => {
    validationGroup.current?.instance.reset();
    changeVisibility();
  };

  const onSaveClick = () => {
    if (!validationGroup.current?.instance.validate().isValid) return;
    validationGroup.current?.instance.reset();

    changeVisibility();
  };

  return (
    <Popup
      title={title}
      visible={visible}
      fullScreen={isXSmall || isSmall}
      width={450}
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
          onClick: onCancelClick,
        }}
      />
      <ValidationGroup ref={validationGroup}>
        {children}
      </ValidationGroup>
    </Popup>
  );
};
