import React from 'react';
import './Avatar.scss';

const Avatar = ({ owner }) => <div className="circle">{owner.split(' ').map((name) => name[0]).join('')}</div>;

export default Avatar;