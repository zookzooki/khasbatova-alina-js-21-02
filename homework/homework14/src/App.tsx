import React from 'react';
import './App.css';
import TodoList from './forms/todo-list/TodoList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="body">
          <TodoList />
        </div>
      </div>
    );
  }
}

export default App;
