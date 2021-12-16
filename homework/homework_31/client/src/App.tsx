import React, { ChangeEvent } from 'react';

import './App.css';

const url = 'http://localhost:3010/api/text';

interface State {
  disabled: boolean;
  value: string;
  error: string;
}

const initialState = {
  disabled: true,
  value: '',
  error: '',
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    this.load();
  }

  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ value: event.target.value });
  }

  async load() {
    const resp = await fetch(url, {
      method: 'GET',
    });
    const text = await resp.text();
    if (resp.ok) {
      this.setState({ value: JSON.parse(text) });
      this.setState({ disabled: false });
    } else {
      this.setState({ error: JSON.parse(text) });
    }
  }

  async save() {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(
        { value: this.state.value },
      ),
    });
    const text = await resp.text();
    if (resp.ok) {
      this.setState({ error: '' });
    } else {
      this.setState({ error: JSON.parse(text) });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="body">
          <textarea id="input" disabled={this.state.disabled} value={this.state.value} onChange={this.handleChange} />
          <div>
            <button type="button" disabled={this.state.disabled} onClick={this.save}>Сохранить</button>
          </div>
          <p className="error">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default App;
