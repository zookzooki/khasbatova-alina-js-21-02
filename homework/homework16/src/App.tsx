import React from 'react';

import './App.css';
import { Header } from './components/Header/Header';
import UserList from './forms/UserList/UserList';
import { ThemeContextProvider, ThemeContext, ThemeContextState } from './contexts/ThemeContext';

const App = () => (
  <ThemeContextProvider>
    <ThemeContext.Consumer>
      {
            (context: Partial<ThemeContextState>) => (
              <div className={`App ${context.darkTheme ? 'App_dark' : ''}`}>
                <Header />
                <div className="body">
                  <UserList />
                </div>
              </div>
            )
          }
    </ThemeContext.Consumer>
  </ThemeContextProvider>
);

export default App;
