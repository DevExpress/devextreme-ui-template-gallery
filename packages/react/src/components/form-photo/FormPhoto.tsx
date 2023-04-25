import React from 'react';

import './FormPhoto.scss';

export const FormPhoto = ({ link, size }: { link: string, size: number }) => {
  return (
    <div className='form-photo-view'>
      <div
        className='form-photo'
        style={{
          width: size,
          height: size,
          maxHeight: size,
          backgroundImage: `url('data:image/png;base64,${link}')`
        }}
      />
    </div>
  );
};
