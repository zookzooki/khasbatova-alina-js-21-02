import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, PictureOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './PostItem.scss';
import { EMPTY_STRING } from '../../constants/common';
import ComponentWithHelper from '../../wrappers/ComponentsWithHelper';

interface Props {
  id?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  avatar?: string;
  picture?: string;
  publishDate?: string;
  text?: string;
  className?: string;
}

const PostItem = ({
  id, firstName, lastName, title, avatar, picture, publishDate, text, className,
}: Props) => {
  const { t } = useTranslation();

  let titleInfo = '';
  if (title === 'mr') {
    titleInfo = t('profile.mrTitle');
  } else if (title === 'ms') {
    titleInfo = t('profile.msTitle');
  } else if (title === 'mrs') {
    titleInfo = t('profile.mrsTitle');
  }

  return (
    <div className={`post ${className}`}>
      <ComponentWithHelper comment={id || ''}>
        <div className="post__header">

          <div className="avatar">
            {
                avatar ? <Avatar src={avatar} /> : <Avatar className="unknownUser" icon={<UserOutlined />} />
              }
          </div>
          <p className="owner_info">
            {`${titleInfo} ${firstName} ${lastName}`}
          </p>

          <p className="publish_date">
            { publishDate ? t('dateTimeFormat', { date: new Date(publishDate) }) : ''}
          </p>
        </div>
      </ComponentWithHelper>
      <div className="post__picture">
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
};

PostItem.defaultProps = {
  id: EMPTY_STRING,
  firstName: EMPTY_STRING,
  lastName: EMPTY_STRING,
  title: EMPTY_STRING,
  avatar: EMPTY_STRING,
  picture: EMPTY_STRING,
  publishDate: EMPTY_STRING,
  text: EMPTY_STRING,
  className: EMPTY_STRING,
};

export default PostItem;
