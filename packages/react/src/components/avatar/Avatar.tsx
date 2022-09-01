import './Avatar.scss';

export const Avatar = ({ owner }: { owner: string }) => (
  <div className='circle'>
    {owner
      .split(' ')
      .map((name) => name[0])
      .join('')}
  </div>
);
