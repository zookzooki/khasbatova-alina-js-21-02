import React from 'react';

import './UserItem.css';
import { EMPTY_STRING } from '../../constants/common';

interface Props {
  id?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  picture?: string;
  className?: string;
}

const UserItem = ({
  id, firstName, lastName, title, picture, className,
}: Props) => (
  <div className={`user ${className}`}>
    <div className="user__picture"><img src={picture} alt="аватарка" /></div>
    <div className="user__info">
      <p className="user__id">{id}</p>
      <p className="user__name">
        {`${title} ${firstName} ${lastName}`}
      </p>
    </div>
  </div>
);

UserItem.defaultProps = {
  id: EMPTY_STRING,
  firstName: EMPTY_STRING,
  lastName: EMPTY_STRING,
  title: EMPTY_STRING,
  picture: EMPTY_STRING,
  className: EMPTY_STRING,
};

export default UserItem;
