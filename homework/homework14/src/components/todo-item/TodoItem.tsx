import React, { MouseEvent } from 'react';

import './TodoItem.css';

interface Props {
  text?: string;
  deleteItem?: (item: string) => void;
}

export default class TodoItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(e: MouseEvent<HTMLElement>): void {
    if (this.props.deleteItem && e.currentTarget?.parentElement?.querySelector('span')) {
      const element = e.currentTarget.parentElement.querySelector('span');
      if (element && element.textContent) {
        this.props.deleteItem(element.textContent);
      }
    }
  }

  render() {
    return (
      <li className="todo-item">
        <span>{this.props.text}</span>
        <button className="delete" type="button" onClick={this.delete}>Удалить</button>
      </li>
    );
  }
}
