import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './UserItem.scss';
import { EMPTY_STRING } from '../../constants/common';

interface Props {
  id?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  picture?: string;
}

const UserItem = ({
  id, firstName, lastName, title, picture,
}: Props) => (
  <Link to={`/profile/${id}`}>
    <div className="user">
      <div className="user__picture">
        {
        picture ? <img src={picture} alt="аватарка" /> : <UserOutlined className="unknownUser" />
      }
      </div>
      <div className="user__info">
        <p className="user__name">
          {`${title} ${firstName} ${lastName}`}
        </p>
      </div>
    </div>
  </Link>
);

UserItem.defaultProps = {
  id: EMPTY_STRING,
  firstName: EMPTY_STRING,
  lastName: EMPTY_STRING,
  title: EMPTY_STRING,
  picture: EMPTY_STRING,
};

export default UserItem;
