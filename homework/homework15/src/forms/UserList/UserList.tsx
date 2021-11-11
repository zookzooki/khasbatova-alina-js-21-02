import React from 'react';
import './UserList.css';
import UserItem from '../../components/UserItem/UserItem';
import { UserType, PostListResponse } from '../../types/dumMyApiResponses';
import ComponentWithHelper from '../../wrappers/ComponentWithHelper';
import { getUsersInfo } from '../../api/dumMyApi';
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';
import { Footer } from '../Footer/Footer';
import { ThemeContextConsumer, ThemeContextState } from '../../contexts/ThemeContext';

interface State {
  users: Array<UserType>;
  page: number;
  pagesCountArr: Array<number>;
  limit: number;
}

const initialState = {
  users: [],
  page: 1,
  pagesCountArr: [],
  limit: 10,
};

export default class UserList extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.loadUsers = this.loadUsers.bind(this);
    this.updatePageNumber = this.updatePageNumber.bind(this);
    this.updateLimitNumber = this.updateLimitNumber.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
  }

  componentDidMount(): void {
    this.loadUsers(PAGE_DEFAULT, 10);
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>): void {
    if (this.state.page !== prevState.page) {
      this.updateUsers(this.state.page, this.state.limit);
    }
    if (this.state.limit !== prevState.limit) {
      this.loadUsers(PAGE_DEFAULT, this.state.limit);
    }
  }

  updatePageNumber(count: number): void {
    this.setState({ page: count });
  }

  updateLimitNumber(count: number): void {
    this.setState({ limit: count });
  }

  updateUsers(page: number, limit: number) {
    getUsersInfo(page, limit, (resp: PostListResponse) => this.setState({ users: resp.data }));
  }

  loadUsers(page: number, limit: number) {
    getUsersInfo(page, limit, (resp: PostListResponse) => {
      this.setState({ users: resp.data });
      const pagesCountArr = [];
      for (let i = 0; i < resp.total / limit; i += 1) {
        pagesCountArr.push(i + 1);
      }
      this.setState({ pagesCountArr });
      this.setState({ page });
    });
  }

  render() {
    return (
      <ThemeContextConsumer>
        {
            (context: Partial<ThemeContextState>) => (
              <div>
                <div className="users-list">
                  {this.state.users.length !== 0
                    ? this.state.users.map((elem: UserType, index: number) => (
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
                  pagesCountArr={this.state.pagesCountArr}
                  updatePageNumber={this.updatePageNumber}
                  updateLimitNumber={this.updateLimitNumber}
                  page={this.state.page}
                />
              </div>
            )
          }
      </ThemeContextConsumer>
    );
  }
}
