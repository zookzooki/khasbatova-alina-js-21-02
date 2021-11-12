import React, { useEffect, useState } from 'react';

import './UserList.css';
import UserItem from '../../components/UserItem/UserItem';
import { UserType, PostListResponse } from '../../types/dumMyApiResponses';
import ComponentWithHelper from '../../wrappers/ComponentWithHelper';
import useOnceOnMount from '../../hooks/useOnceOnMount';
import { getUsersInfo } from '../../api/dumMyApi';
import { PAGE_DEFAULT, LIMIT_DEFAULT } from '../../constants/api/dumMyApi';
import { Footer } from '../Footer/Footer';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

const UserList = () => {
  const [users, setUsers] = useState([] as Array<UserType>);
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT_DEFAULT);
  const [total, setTotal] = useState(0);

  const updatePageNumber = (count: number): void => {
    setPage(count);
  };

  const updateLimitNumber = (count: number) => {
    setLimit(count);
  };

  const updateUsers = (pageNumber: number, limitNumber: number) => {
    getUsersInfo(pageNumber, limitNumber, (resp: PostListResponse) => setUsers(resp.data));
  };

  const loadUsers = (pageNumber: number, limitNumber: number) => {
    getUsersInfo(pageNumber, limitNumber, (resp: PostListResponse) => {
      setUsers(resp.data);
      setTotal(resp.total);
      updatePageNumber(pageNumber);
    });
  };

  useOnceOnMount(() => loadUsers(PAGE_DEFAULT, LIMIT_DEFAULT));

  useEffect(() => {
    updateUsers(page, limit);
  }, [page]);

  useEffect(() => {
    loadUsers(PAGE_DEFAULT, limit);
  }, [limit]);

  return (
    <ThemeContext.Consumer>
      {
            (context: Partial<ThemeContextState>) => (
              <div>
                <div className="users-list">
                  {users.length !== 0
                    ? users.map((elem: UserType, index: number) => (
                      <ComponentWithHelper comment={elem.id ? elem.id : ''} key={index}>
                        <UserItem
                          className={context.darkTheme ? 'user_dark' : ''}
                          id={elem.id}
                          firstName={elem.firstName}
                          lastName={elem.lastName}
                          title={elem.title}
                          picture={elem.picture}
                          key={index}
                        />
                      </ComponentWithHelper>
                    ))
                    : 'Список загружается'}
                </div>
                <Footer
                  updatePageNumber={updatePageNumber}
                  updateLimitNumber={updateLimitNumber}
                  page={page}
                  pageSize={limit}
                  total={total}
                />
              </div>
            )
          }
    </ThemeContext.Consumer>
  );
};

export default UserList;
