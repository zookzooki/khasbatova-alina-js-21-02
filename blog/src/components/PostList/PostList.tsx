import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import './PostList.scss';
import PostItem from '../PostItem/PostItem';
import { PostCard } from '../PostCard/PostCard';
import { PostType } from '../../redux/types/dumMyApiResponses';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../constants/api/dumMyApi';
import { ThemeContext, ThemeContextState } from '../../context/ThemeContext';
import { load, updateCurPage } from '../../redux/actions/postListAction';
import { visibleModal, load as loadComments } from '../../redux/actions/commentListAction';
import { Loader } from '../Loader/Loader';

export const PostList = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state: any) => state.postList.list);
  const loading = useSelector((state: any) => state.postList.loading);
  const error = useSelector((state: any) => state.postList.error);
  const curPage = useSelector((state: any) => state.postList.curPage);
  const total = useSelector((state: any) => state.postList.total);

  const openModal = (post: PostType) => {
    dispatch(visibleModal());
    dispatch(loadComments(post, PAGE_DEFAULT));
  };

  useEffect(() => {
    dispatch(load(curPage));
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
                              <PostCard />
                              <div onClick={() => openModal(elem)}>
                                <PostItem
                                  id={elem?.owner?.id}
                                  firstName={elem?.owner?.firstName}
                                  lastName={elem?.owner?.lastName}
                                  title={elem?.owner?.title}
                                  avatar={elem?.owner?.picture}
                                  picture={elem.image}
                                  publishDate={elem.publishDate}
                                  text={elem.text}
                                />
                              </div>
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
                            onChange={(page: number) => dispatch(updateCurPage(page))}
                          />
                        </div>

                      </div>
                    )
                }
        </ThemeContext.Consumer>
      )
  );
};
