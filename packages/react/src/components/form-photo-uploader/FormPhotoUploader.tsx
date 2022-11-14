import React, { useCallback, useState } from 'react';

import './FormPhotoUploader.scss';

import { FileUploader } from 'devextreme-react/file-uploader';

export const FormPhotoUploader = () => {
  const [isDropZoneActive, setDropZoneActive] = useState(false);

  const onDropZoneEnter = useCallback((e) => {
    if (e.dropZoneElement.id === 'uploader') {
      setDropZoneActive(true);
    }
  }, [isDropZoneActive]);

  const onDropZoneLeave = useCallback((e) => {
    if (e.dropZoneElement.id === 'uploader') {
      setDropZoneActive(false);
    }
  }, [isDropZoneActive]);

  return (
    <div>
      <div
        id='uploader'
        className={`${ isDropZoneActive
          ? 'dx-theme-accent-as-border-color'
          : 'dx-theme-border-color' }`}
      >
        <span>Drag and drop a photo here or click the area to select it from a folder</span>
      </div>
      <FileUploader
        dialogTrigger='#uploader'
        dropZone='#uploader'
        multiple={false}
        accept='image/*'
        uploadMode='instantly'
        showFileList={false}
        visible={false}
        onDropZoneEnter={onDropZoneEnter}
        onDropZoneLeave={onDropZoneLeave}
      />
    </div>
  );
};
