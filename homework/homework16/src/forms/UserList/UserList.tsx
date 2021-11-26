import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './UserList.css';
import UserItem from '../../components/UserItem/UserItem';
import { UserType } from '../../types/dumMyApiResponses';
import ComponentWithHelper from '../../wrappers/ComponentWithHelper';
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';
import { Footer } from '../Footer/Footer';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';
import { load } from '../../actions/UserListActions';

export const UserList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: any) => state.users.usersList);
  const loading = useSelector((state: any) => state.users.loading);
  const error = useSelector((state: any) => state.users.error);
  const curPage = useSelector((state: any) => state.users.curPage);
  const limit = useSelector((state: any) => state.users.limit);

  useEffect(() => {
    dispatch(load(curPage, limit));
  }, []);

  useEffect(() => {
    dispatch(load(curPage, limit));
  }, [curPage]);

  useEffect(() => {
    dispatch(load(PAGE_DEFAULT, limit));
  }, [limit]);

  return (
    <ThemeContext.Consumer>
      {
            (context: Partial<ThemeContextState>) => (
              <div>
                <div className="users-list">
                  {
                    error ? <div>{error}</div> : loading
                      ? 'загрузка'
                      : usersList?.map((elem: UserType, index: number) => (
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
                    }
                </div>
                <Footer />
              </div>
            )
          }
    </ThemeContext.Consumer>
  );
};
