import React, { useRef, useMemo, useCallback } from 'react';

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
  const validationGroup = useRef<ValidationGroup>(null);

  const onCancelClick = useCallback(() => {
    validationGroup.current?.instance.reset();
    changeVisibility();
  }, []);

  const onSaveClick = useCallback(() => {
    if (!validationGroup.current?.instance.validate().isValid) return;
    validationGroup.current?.instance.reset();

    changeVisibility();
  }, []);

  const ToolbarSaveOptions = useMemo(() => ({
    text: 'Save',
    stylingMode: 'outlined',
    type: 'default',
    onClick: onSaveClick,
  }), []);

  const ToolbarCancelOptions = useMemo(()=>({
    text: 'Cancel',
    stylingMode: 'text',
    type: 'default',
    onClick: onCancelClick,
  }), []);

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
        options={ToolbarSaveOptions}
      />
      <ToolbarItem
        widget='dxButton'
        toolbar='bottom'
        location='after'
        options={ToolbarCancelOptions}
      />
      <ValidationGroup ref={validationGroup}>
        {children}
      </ValidationGroup>
    </Popup>
  );
};
