import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { useTranslation } from 'react-i18next';

import './CommentList.scss';
import { CommentType } from '../../redux/types/dumMyApiResponses';
import { LIMIT_DEFAULT } from '../../constants/api/dumMyApi';
import { load } from '../../redux/actions/commentListAction';
import { Loader } from '../Loader/Loader';
import CommentItem from '../CommentItem/CommentItem';

export const CommentList = () => {
  const dispatch = useDispatch();
  const commentList = useSelector((state: any) => state.commentList.list);
  const loading = useSelector((state: any) => state.commentList.loading);
  const error = useSelector((state: any) => state.commentList.error);
  const curPage = useSelector((state: any) => state.commentList.curPage);
  const total = useSelector((state: any) => state.commentList.total);
  const post = useSelector((state: any) => state.commentList.post);
  const { t } = useTranslation();

  const onChange = (page: number) => {
    dispatch(load(post, page));
  };

  return (
    error ? <div>{error}</div> : loading
      ? <Loader />
      : commentList.length
        ? (
          <div className="comments">
            <div className="comment-list">
              {commentList?.map((elem: CommentType, index: number) => (
                <CommentItem
                  firstName={elem?.owner?.firstName}
                  lastName={elem?.owner?.lastName}
                  title={elem?.owner?.title}
                  picture={elem?.owner?.picture}
                  message={elem?.message}
                  publishDate={elem?.publishDate}
                  key={index}
                />
              ))}
            </div>
            <div>
              <Pagination
                size="small"
                className="pagination"
                simple
                pageSize={LIMIT_DEFAULT}
                total={total}
                current={curPage}
                onChange={(page: number) => onChange(page)}
              />
            </div>

          </div>
        )
        : <p className="no_comments">{t('comment.noComments')}</p>
  );
};
