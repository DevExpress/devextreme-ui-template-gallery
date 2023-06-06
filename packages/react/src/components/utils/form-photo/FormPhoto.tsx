import React from 'react';

import './FormPhoto.scss';
import { FileUploader } from 'devextreme-react';

export const FormPhoto = ({ link, size, editable = false }: { link: string, size: number, editable?: boolean }) => {
  return (
    <div className='form-photo-view'>
      <div
        className={`form-photo ${editable ? 'editable' : ''}`}
        style={{
          width: size,
          height: size,
          maxHeight: size,
          backgroundImage: `url('data:image/png;base64,${link}')`
        }}
      >
        { editable && <i className='edit-icon dx-icon-photooutline' /> }
      </div>
      { editable &&
        <FileUploader
          dialogTrigger='.edit-icon'
          accept='image/*'
          visible={false}
        />
      }
    </div>
  );
};
