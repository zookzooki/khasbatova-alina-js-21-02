import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './CommentItem.scss';
import { EMPTY_STRING } from '../../constants/common';
import { formatDate } from '../../help/help';

interface Props {
  firstName?: string;
  lastName?: string;
  title?: string;
  picture?: string;
  message?: string;
  publishDate?: string;
}

const CommentItem = ({
  firstName, lastName, title, picture, message, publishDate,
}: Props) => {
  let date;
  if (publishDate) {
    date = formatDate(publishDate);
  }

  return (
    <div className="comment">
      <div className="comment_header">
        <div className="owner">
          <div className="avatar">
            {
              picture ? <Avatar src={picture} /> : <Avatar className="unknownUser" icon={<UserOutlined />} />
            }
          </div>
          <p className="owner_info">
            {`${title} ${firstName} ${lastName}`}
          </p>
        </div>
        <p className="publish_date">
          {date}
        </p>
      </div>
      <div className="comment_content">
        <p className="text">
          {message}
        </p>
      </div>
    </div>
  );
};

CommentItem.defaultProps = {
  firstName: EMPTY_STRING,
  lastName: EMPTY_STRING,
  title: EMPTY_STRING,
  picture: EMPTY_STRING,
  message: EMPTY_STRING,
  publishDate: EMPTY_STRING,
};

export default CommentItem;
