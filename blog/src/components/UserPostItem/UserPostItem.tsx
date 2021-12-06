import React from 'react';
import { PictureOutlined } from '@ant-design/icons';

import './UserPostItem.scss';
import { EMPTY_STRING } from '../../constants/common';

interface Props {
  picture?: string;
  text?: string;
  className?: string;
}

const UserPostItem = ({ picture, text, className }: Props) => (
  <div className={`user_post ${className}`}>
    <div className="picture">
      {
              picture ? <img src={picture} alt="картинка поста" /> : <PictureOutlined className="noPicture" />
            }
    </div>
    <div className="post__content">
      <p className="post__text">
        {text}
      </p>
    </div>
  </div>
);

UserPostItem.defaultProps = {
  picture: EMPTY_STRING,
  text: EMPTY_STRING,
  className: EMPTY_STRING,
};

export default UserPostItem;
