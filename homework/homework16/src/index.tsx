import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ruRU from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';
import store from './store';
import 'antd/dist/antd.css';

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
