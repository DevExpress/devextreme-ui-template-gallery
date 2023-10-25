import './FormPopup.scss';
import React, { useCallback, useRef, PropsWithChildren } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ValidationGroup from 'devextreme-react/validation-group';
import { useScreenSize } from '../../../utils/media-query';
import { Button } from 'devextreme-react';

type PopupProps = {
  title: string,
  visible: boolean,
  width?: number,
  wrapperAttr?: { class: string },
  isSaveDisabled?: boolean,
  setVisible: (visible: boolean) => void,
  onSave?: () => void,
}

export const FormPopup = ({
  title,
  visible,
  width = 480,
  onSave,
  setVisible,
  wrapperAttr = { class: '' },
  isSaveDisabled = false,
  children
}: PropsWithChildren<PopupProps>) => {
  const { isXSmall } = useScreenSize();
  const validationGroup = useRef<ValidationGroup>(null);

  const close = () => {
    validationGroup.current?.instance.reset();
    setVisible(false);
  };

  const onCancelClick = useCallback(() => {
    close();
  }, [close, validationGroup]);

  const onSaveClick = useCallback(() => {
    if (!validationGroup.current?.instance.validate().isValid) return;

    onSave && onSave();
    close();
  }, [validationGroup]);

  return (
    <Popup
      title={title}
      visible={visible}
      fullScreen={isXSmall}
      width={width}
      wrapperAttr={{ ...wrapperAttr, class: `${wrapperAttr?.class} form-popup` }}
      height='auto'
    >
      <ToolbarItem
        toolbar='bottom'
        location='center'
      >
        <div className={`form-popup-buttons-container ${width <= 360 ? 'flex-buttons' : ''}`}>
          <Button
            text='Cancel'
            stylingMode='contained'
            onClick={onCancelClick}
          />
          <Button
            text='Save'
            stylingMode='contained'
            type='default'
            disabled={isSaveDisabled}
            onClick={onSaveClick}
          />
        </div>
      </ToolbarItem>

      <ValidationGroup ref={validationGroup}>
        {children}
      </ValidationGroup>
    </Popup>
  );
};
