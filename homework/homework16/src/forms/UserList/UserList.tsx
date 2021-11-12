import React, { useEffect, useState } from 'react';
import './UserList.css';
import UserItem from '../../components/UserItem/UserItem';
import { UserType, PostListResponse } from '../../types/dumMyApiResponses';
import ComponentWithHelper from '../../wrappers/ComponentWithHelper';
import useOnceOnMount from '../../hooks/useOnceOnMount';
import { getUsersInfo } from '../../api/dumMyApi';
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';
import { Footer } from '../Footer/Footer';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

const UserList = () => {
  const [users, setUsers] = useState([] as Array<UserType>);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagesCountArr, setPagesCountArr] = useState([] as Array<number>);

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
      const arr = [];
      for (let i = 0; i < resp.total / limitNumber; i += 1) {
        arr.push(i + 1);
      }
      setPagesCountArr(arr);
      updatePageNumber(pageNumber);
    });
  };

  useOnceOnMount(() => loadUsers(PAGE_DEFAULT, 10));

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
                  pagesCountArr={pagesCountArr}
                  updatePageNumber={updatePageNumber}
                  updateLimitNumber={updateLimitNumber}
                  page={page}
                />
              </div>
            )
          }
    </ThemeContext.Consumer>
  );
};

export default UserList;
