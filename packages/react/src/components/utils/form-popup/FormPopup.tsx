import React, { useCallback, useRef, forwardRef } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ValidationGroup from 'devextreme-react/validation-group';
import { useScreenSize } from '../../../utils/media-query';
import { Button } from 'devextreme-react';

type PopupProps = {
  title: string,
  visible: boolean,
  width: number,
  wrapperAttr: { className: string },
  isSaveDisabled: boolean,
  setVisible: (visible: boolean) => void,
  onSave: () => void,
}

export const FormPopup = forwardRef<unknown, React.PropsWithChildren<PopupProps>>(({
  title,
  visible,
  width = 480,
  setVisible,
  onSave,
  wrapperAttr,
  isSaveDisabled,
  children
}) => {
  const { isXSmall } = useScreenSize();
  const validationGroup = useRef<ValidationGroup>(null);

  const close = () => {
    validationGroup.current?.instance.reset();
    setVisible(false);
  };

  const onCancelClick = useCallback(() => {
    close();
  }, [close]);

  return (
    <Popup
      title={title}
      visible={visible}
      fullScreen={isXSmall}
      width={width}
      wrapperAttr={{ ...wrapperAttr, class: `${wrapperAttr.className} form-popup` }}
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
            onClick={onSave}
          />
        </div>
      </ToolbarItem>

      <ValidationGroup ref={validationGroup}>
        {children}
      </ValidationGroup>
    </Popup>
  );
});
