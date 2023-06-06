import React, { useCallback, useState, useRef } from 'react';

import './FormPhotoUploader.scss';

import { FileUploader, FileUploaderTypes } from 'devextreme-react/file-uploader';

export const FormPhotoUploader = () => {
  const [isDropZoneActive, setDropZoneActive] = useState(false);

  const uploaderZone = useRef();

  const getUploaderRef = useCallback(
    (element) => {
      uploaderZone.current = element;
    }, []);

  const onDropZoneEvent = useCallback((e: FileUploaderTypes.DropZoneEnterEvent | FileUploaderTypes.DropZoneLeaveEvent) => {
    if (e.dropZoneElement.id === 'uploader') {
      setDropZoneActive(e.event?.type === 'dragenter');
    }
  }, []);

  return (
    <div>
      <div
        ref={getUploaderRef}
        id='uploader'
        className={`${ isDropZoneActive
          ? 'dx-theme-accent-as-border-color'
          : 'dx-theme-border-color' }`}
      >
        <span>Drag and drop a photo here or click the area to select it from a folder</span>
      </div>
      <FileUploader
        dialogTrigger={uploaderZone.current}
        dropZone={uploaderZone.current}
        multiple={false}
        accept='image/*'
        uploadMode='instantly'
        showFileList={false}
        visible={false}
        onDropZoneEnter={onDropZoneEvent}
        onDropZoneLeave={onDropZoneEvent}
      />
    </div>
  );
};
