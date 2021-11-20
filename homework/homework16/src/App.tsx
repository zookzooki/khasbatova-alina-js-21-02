import React from 'react';
import {
  Route, Switch, HashRouter, Redirect,
} from 'react-router-dom';

import './App.css';
import { Header } from './components/Header/Header';
import UserList from './forms/UserList/UserList';
import UserProfile from './forms/UserProfile/UserProfile';
import { Registration } from './forms/Registration/Registration';
import { ThemeContextProvider, ThemeContext, ThemeContextState } from './contexts/ThemeContext';

const App = () => (
  <ThemeContextProvider>
    <ThemeContext.Consumer>
      {
            (context: Partial<ThemeContextState>) => (
              <HashRouter>
                <div className={`App ${context.darkTheme ? 'App_dark' : ''}`}>
                  <Header />
                  <div className="body">
                    <Switch>
                      <Route path="/user/:id">
                        <UserProfile />
                      </Route>
                      <Route path="/register">
                        <Registration />
                      </Route>
                      <Route path="/user">
                        <UserList />
                      </Route>
                      <Redirect from="/" to="user" />
                    </Switch>
                  </div>
                </div>
              </HashRouter>
            )
          }
    </ThemeContext.Consumer>
  </ThemeContextProvider>
);

export default App;
