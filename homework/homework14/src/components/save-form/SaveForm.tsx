import React from 'react';

import './SaveForm.css';
import { TodoType } from '../../types/responses';

interface Props {
  text?: string;
  addItem?: (item: TodoType) => void;
}

export default class SaveForm extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(): void {
    const input = document.querySelector('input');
    if (input && this.props.addItem) {
      this.props.addItem(input.value);
      input.value = '';
    }
  }

  render() {
    return (
      <div>
        <input type="text" name="input" />
        <button type="button" onClick={this.save}>Добавить</button>
      </div>
    );
  }
}
