import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import './UserPostList.scss';
import UserPostItem from '../UserPostItem/UserPostItem';
import { PostType } from '../../redux/types/dumMyApiResponses';
import { LIMIT_DEFAULT } from '../../constants/api/dumMyApi';
import { EMPTY_STRING } from '../../constants/common';

import { ThemeContext, ThemeContextState } from '../../context/ThemeContext';
import { loadByUser, reset } from '../../redux/actions/postListAction';
import { Loader } from '../Loader/Loader';

interface Props {
  id?: string;
}

export const UserPostList = ({ id }: Props) => {
  const dispatch = useDispatch();
  const curPage = useSelector((state: any) => state.postList.curPage);
  const total = useSelector((state: any) => state.postList.total);
  const postList = useSelector((state: any) => state.postList.list);
  const error = useSelector((state: any) => state.postList.error);
  const loading = useSelector((state: any) => state.postList.loading);

  useEffect(() => {
    dispatch(reset());
    if (id) {
      dispatch(loadByUser(id, curPage));
    }
  }, []);

  return (
    error ? <div>{error}</div> : loading
      ? <Loader />
      : (
        <ThemeContext.Consumer>
          {
                    (context: Partial<ThemeContextState>) => (
                      <div className={`posts ${context.darkTheme ? 'posts_dark' : ''}`}>
                        <div className="post-list">
                          {postList?.map((elem: PostType, index: number) => (
                            <div key={index}>
                              <UserPostItem
                                picture={elem.image}
                                text={elem.text}
                              />
                            </div>

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
                            onChange={(page: number) => dispatch(loadByUser(id || '', page))}
                          />
                        </div>

                      </div>
                    )
                }
        </ThemeContext.Consumer>
      )
  );
};

UserPostList.defaultProps = {
  id: EMPTY_STRING,
};

export default UserPostList;
