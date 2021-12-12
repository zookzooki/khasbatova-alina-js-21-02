import React from 'react';
import { Layout, Switch as ThemeSwitch, Select } from 'antd';
import {
  Route, HashRouter, Redirect, Switch,
} from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import './locale/i18next';

import './App.scss';
import { HeaderBlog } from './components/HeaderBlog/HeaderBlog';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { UserList } from './components/UserList/UserList';
import { PostList } from './components/PostList/PostList';
import { Profile } from './components/Profile/Profile';
import { ThemeContext, ThemeContextProvider, ThemeContextState } from './context/ThemeContext';

const { Content, Footer } = Layout;
const { Option } = Select;

const App = () => {
  const { t } = useTranslation();

  const handleChangeLanguage = (value: string) => {
    i18next.changeLanguage(value);
  };

  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {
                    (context: Partial<ThemeContextState>) => (
                      <div className={`App ${context.darkTheme ? 'App_dark' : ''}`}>
                        <HashRouter>
                          <Layout>
                            <HeaderBlog />
                            <div className="body">
                              <Content className="content">
                                <div>
                                  <Switch>
                                    <Route path="/signin">
                                      <SignIn />
                                    </Route>
                                    <Route path="/signup">
                                      <SignUp />
                                    </Route>
                                    <Route path="/user">
                                      <UserList />
                                    </Route>
                                    <Route path="/post">
                                      <PostList />
                                    </Route>
                                    <Route path="/profile/:id">
                                      <Profile />
                                    </Route>
                                    <Redirect from="/" to="signin" />
                                  </Switch>
                                </div>
                              </Content>
                            </div>
                            <Footer className="footer">
                              <p style={{ textAlign: 'left' }}>Zookzooki Design ©2021</p>
                              <div className="switch">
                                <p>{t('footer.darkTheme')}</p>
                                <ThemeSwitch
                                  className="checker"
                                  checked={context.darkTheme}
                                  onChange={
                                                    (e: any) => {
                                                      context.toggleTheme
                                                        && context.toggleTheme(e);
                                                    }
                                                }
                                />
                                <Select
                                  defaultValue={window.localStorage.i18nextLng.split('-')[0]}
                                  size="small"
                                  onChange={handleChangeLanguage}
                                >
                                  <Option value="ru">Русский</Option>
                                  <Option value="en">English</Option>
                                </Select>
                              </div>
                            </Footer>
                          </Layout>
                        </HashRouter>
                      </div>
                    )
                }
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  );
};
export default App;
