import React, { useCallback, useRef } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ValidationGroup from 'devextreme-react/validation-group';
import { useScreenSize } from './../../utils/media-query';
import { Button } from 'devextreme-react';

type PopupProps = {
  title: string,
  visible: boolean,
  changeVisibility: () => void,
}

export const FormPopup = ({ title, visible, changeVisibility, children }: React.PropsWithChildren<PopupProps>) => {
  const { isXSmall, isSmall } = useScreenSize();
  const validationGroup = useRef<ValidationGroup>(null);

  const onCancelClick = useCallback(() => {
    validationGroup.current?.instance.reset();
    changeVisibility();
  }, [changeVisibility]);

  const onSaveClick = useCallback(() => {
    if (!validationGroup.current?.instance.validate().isValid) return;
    validationGroup.current?.instance.reset();

    changeVisibility();
  }, [changeVisibility]);

  return (
    <Popup
      title={title}
      visible={visible}
      fullScreen={isXSmall || isSmall}
      width='auto'
      height='auto'
      showCloseButton={false}
    >
      <ToolbarItem
        widget='dxButton'
        toolbar='bottom'
        location='after'
      >
        <Button
          text= 'Save'
          stylingMode= 'outlined'
          type= 'default'
          onClick={onSaveClick}
        />
      </ToolbarItem>
      <ToolbarItem
        widget='dxButton'
        toolbar='bottom'
        location='after'
      >
        <Button
          text='Cancel'
          stylingMode='text'
          type='default'
          onClick={onCancelClick}
        />
      </ToolbarItem>
      <ValidationGroup ref={validationGroup}>
        {children}
      </ValidationGroup>
    </Popup>
  );
};
