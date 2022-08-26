import './Avatar.scss';

const Avatar = ({ owner }: { owner: string }) => (
  <div className='circle'>
    {owner
      .split(' ')
      .map((name) => name[0])
      .join('')}
  </div>
);

export default Avatar;
