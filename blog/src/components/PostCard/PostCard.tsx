import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, CloseOutlined, PictureOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import './PostCard.scss';
import { notVisibleModal } from '../../redux/actions/commentListAction';
import { formatDate } from '../../help/help';
import { CommentList } from '../CommentList/CommentList';
import ComponentWithHelper from '../../wrappers/ComponentsWithHelper';

export const PostCard = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state: any) => state.commentList.visibleModal);
  const post = useSelector((state: any) => state.commentList.post);

  const onClose = () => {
    dispatch(notVisibleModal());
  };

  if (!visible) return null;

  return (
    <div className="modal">
      <CloseOutlined onClick={onClose} className="modal-close" />
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <ComponentWithHelper comment={post.owner.id || ''}>
            <Link to={`/profile/${post.owner.id}`} onClick={onClose}>
              <div className="owner">
                <div className="avatar">
                  {
              post.owner.picture
                ? <Avatar src={post.owner.picture} />
                : <Avatar className="unknownUser" icon={<UserOutlined />} />
            }
                </div>
                <p className="owner_info">
                  {`${post.owner.title} ${post.owner.firstName} ${post.owner.lastName}`}
                </p>
              </div>
            </Link>
          </ComponentWithHelper>
          <p className="publish_date">
            {formatDate(post.publishDate)}
          </p>
        </div>
        <div className="modal-body">
          <div className="picture">
            {
            post.image ? <img src={post.image} alt="картинка поста" /> : <PictureOutlined className="noPicture" />
          }
          </div>
          <div className="modal-content">
            <p className="post__text">
              {post.text}
            </p>
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  );
};
