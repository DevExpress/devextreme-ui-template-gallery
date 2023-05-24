import React from 'react';
import './UserAvatar.scss';

export const UserAvatar = ({ owner }: { owner: string }) => (
  <div className='circle'>
    {owner
      .split(' ')
      .map((name) => name[0])
      .join('')}
  </div>
);
