import React from 'react';

import './TodoList.css';
import { TodoType } from '../../types/responses';
import TodoItem from '../../components/todo-item/TodoItem';
import SaveForm from '../../components/save-form/SaveForm';

interface State {
  todoResponse?: Array<TodoType>;
}

export default class TodoList extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    const todos = localStorage.getItem('todo');
    this.state = { todoResponse: todos ? JSON.parse(todos) : [] };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(item: TodoType): void {
    const localObj = localStorage.getItem('todo');
    const localObjParce = localObj ? JSON.parse(localObj) : [];
    localObjParce.push(item);
    localStorage.setItem('todo', JSON.stringify(localObjParce));
    if (this.state.todoResponse) {
      const newTodos = [...this.state.todoResponse, item];
      this.setState({ todoResponse: newTodos });
    }
  }

  deleteItem(item: TodoType): void {
    const localObj = localStorage.getItem('todo');
    if (localObj && this.state.todoResponse) {
      const localObjParce = JSON.parse(localObj);
      const newLocalObj = localObjParce.filter((el: TodoType) => el !== item);
      localStorage.setItem('todo', JSON.stringify(newLocalObj));
      const newTodos = [...this.state.todoResponse].filter((el) => el !== item);
      this.setState({ todoResponse: newTodos });
    }
  }

  render() {
    return (
      <div className="todo-list">
        <p>TODO:</p>
        <ul>
          {
            this.state.todoResponse && this.state.todoResponse.length !== 0
              ? this.state.todoResponse.map((elem: TodoType, index: number) => (
                <TodoItem
                  text={elem}
                  key={index}
                  deleteItem={this.deleteItem}
                />
              ))
              : 'Список пуст'
        }
        </ul>
        <SaveForm addItem={this.addItem} />
      </div>
    );
  }
}
