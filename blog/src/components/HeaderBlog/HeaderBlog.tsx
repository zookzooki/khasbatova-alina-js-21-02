import React from 'react';
import {
  Layout, Menu, Divider, Avatar,
} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { TeamOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './HeaderBlog.scss';
import { reset } from '../../redux/actions/signInAction';
import { reset as userListReset } from '../../redux/actions/userListAction';
import { reset as postListReset } from '../../redux/actions/postListAction';
import { load as loadProfile } from '../../redux/actions/profileAction';
import { ThemeContext, ThemeContextState } from '../../context/ThemeContext';

const { Header } = Layout;

export const HeaderBlog = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.signIn.isAuth);
  const info = useSelector((state: any) => state.signIn.info);
  const { t } = useTranslation();

  const handleClick = (e: any) => {
    if (e.key === 'signout') {
      dispatch(userListReset());
      dispatch(postListReset());
      dispatch(reset());
    }

    if (e.key === 'profile') {
      dispatch(loadProfile(info.id));
    }
  };

  const profileHeader = (
    <div className="profileHeader">
      <Divider className="divider" type="vertical" />
      <Link to={`/profile/${info.id}`}>
        <div className="profileInfo">
          <div className="profileAvatar">
            {
              info.picture ? <Avatar src={info.picture} /> : <Avatar className="unknownUser" icon={<UserOutlined />} />
            }
          </div>
          <p>{info.firstName}</p>
        </div>
      </Link>
    </div>
  );

  return (
    <ThemeContext.Consumer>
      {
          (context: Partial<ThemeContextState>) => (
            <Header className={`header ${context.darkTheme ? 'header_dark' : ''}`}>
              <div><img className="logo" src={context.darkTheme ? './logo_dark.png' : './logo.png'} alt="лого" /></div>
              <Menu
                theme={context.darkTheme ? 'dark' : 'light'}
                mode="horizontal"
                className="menu"
                onClick={(e) => handleClick(e)}
              >
                <Menu.Item icon={<TeamOutlined />}>
                  <Link to="/user">
                    {t('header.users')}
                  </Link>
                </Menu.Item>
                <Menu.Item icon={<PictureOutlined />}>
                  <Link to="/post">
                    {t('header.posts')}
                  </Link>
                </Menu.Item>
                {isAuth
                  ? <Menu.Item key="signout"><Link to="/signin">{t('header.logOut')}</Link></Menu.Item>
                  : <Menu.Item key="signin"><Link to="/signin">{t('header.signIn')}</Link></Menu.Item>}
                {isAuth
                  ? (
                    <Menu.Item key="profile">
                      {profileHeader}
                    </Menu.Item>
                  )
                  : (
                    <Menu.Item>
                      <Divider className="divider" type="vertical" />
                      <Link to="/signup">
                        {t('header.signUp')}
                      </Link>
                    </Menu.Item>
                  )}
              </Menu>
            </Header>
          )
        }
    </ThemeContext.Consumer>
  );
};
