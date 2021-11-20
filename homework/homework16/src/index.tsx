import React from 'react';
import ReactDOM from 'react-dom';
import ruRU from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
