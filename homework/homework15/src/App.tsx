import React from 'react';

import './App.css';
import { Header } from './components/Header/Header';
import UserList from './forms/UserList/UserList';
import { ThemeContextProvider, ThemeContextConsumer, ThemeContextState } from './contexts/ThemeContext';

class App extends React.Component {
  render() {
    return (
      <ThemeContextProvider>
        <ThemeContextConsumer>
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
        </ThemeContextConsumer>
      </ThemeContextProvider>
    );
  }
}

export default App;
