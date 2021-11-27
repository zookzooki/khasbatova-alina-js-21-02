import React, { useState } from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

import './Header.css';

export const Header = () => {
  const [currentItem, setCurrentItem] = useState('list');

  const handleClick = (e: any) => {
    setCurrentItem(e.key);
  };

  return (
    <div className="header">
      <Menu onClick={handleClick} selectedKeys={[currentItem]} mode="horizontal">
        <Menu.Item key="list">
          <Link to="/user">
            Пользователи
          </Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">
            Регистрация
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
