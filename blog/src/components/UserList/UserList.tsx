import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import './UserList.scss';
import UserItem from '../UserItem/UserItem';
import { UserType } from '../../redux/types/dumMyApiResponses';
import { LIMIT_DEFAULT } from '../../constants/api/dumMyApi';
import ComponentWithHelper from '../../wrappers/ComponentsWithHelper';
import { ThemeContext, ThemeContextState } from '../../context/ThemeContext';
import { load, updateCurPage } from '../../redux/actions/userListAction';
import { Loader } from '../Loader/Loader';

export const UserList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: any) => state.userList.list);
  const loading = useSelector((state: any) => state.userList.loading);
  const error = useSelector((state: any) => state.userList.error);
  const curPage = useSelector((state: any) => state.userList.curPage);
  const total = useSelector((state: any) => state.userList.total);

  useEffect(() => {
    dispatch(load(curPage));
  }, []);

  useEffect(() => {
    dispatch(load(curPage));
  }, [curPage]);

  return (
    <ThemeContext.Consumer>
      {
          (context: Partial<ThemeContextState>) => (
            error ? <div>{error}</div> : loading
              ? <Loader />
              : (
                <div className={`users ${context.darkTheme ? 'users_dark' : ''}`}>
                  <div className="users-list">
                    {usersList?.map((elem: UserType, index: number) => (
                      <ComponentWithHelper comment={elem.id ? elem.id : ''} key={index}>
                        <UserItem
                            // className={context.darkTheme ? 'user_dark' : ''}
                          id={elem.id}
                          firstName={elem.firstName}
                          lastName={elem.lastName}
                          title={elem.title}
                          picture={elem.picture}
                          key={index}
                        />
                      </ComponentWithHelper>
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
          )
      }
    </ThemeContext.Consumer>
  );
};
