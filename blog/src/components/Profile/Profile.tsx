import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { FormOutlined, UserOutlined } from '@ant-design/icons';

import './Profile.scss';
import { load, visibleModal } from '../../redux/actions/profileAction';
import { EditProfile } from '../EditProfile/EditProfile';
import { Loader } from '../Loader/Loader';
import { UserPostList } from '../UserPostList/UserPostList';
import { formatDateNoTime } from '../../help/help';

interface Params {
  id: string;
}

export const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams<Params>();
  const info = useSelector((state: any) => state.profile.info);
  const loading = useSelector((state: any) => state.profile.loading);
  const error = useSelector((state: any) => state.profile.error);
  const infoAuth = useSelector((state: any) => state.signIn.info);

  const isAuth = infoAuth.id === params.id;

  useEffect(() => {
    dispatch(load(params.id));
  }, []);

  const openModal = () => {
    dispatch(visibleModal());
  };

  return error ? <div>{error}</div> : loading
    ? <Loader />
    : (
      <div className="profile">
        <EditProfile />
        <div className="card">
          <div className="info">
            <div className="avatar">
              { info.picture ? <img src={info.picture} alt="аватарка" /> : <UserOutlined className="unknownUser" />}
            </div>
            <div className="user__info">
              <p className="user__name">
                {`${info.title ? info.title : ''} ${info.firstName} ${info.lastName}`}
              </p>
              <div className="additional_info">
                { info.gender ? <p>{info.gender}</p> : ''}
                <p>
                  <span>Дата рождения: </span>
                  {info.dateOfBirth ? formatDateNoTime(info.dateOfBirth) : '-'}
                </p>
                <p>
                  <span>Дата регистрации: </span>
                  {formatDateNoTime(info.registerDate)}
                </p>
                <p>
                  <span>Email: </span>
                  {info.email}
                </p>
                <p>
                  <span>Телефон: </span>
                  {info.phone ? info.phone : '-'}
                </p>
              </div>
              <p className="user__id">
                <span>ID: </span>
                {info.id}
              </p>
            </div>
          </div>

          <button type="button" className={`edit ${isAuth ? '' : 'notDisplay'}`} onClick={openModal}>
            <FormOutlined />
            Редактировать
          </button>
        </div>
        <UserPostList id={params.id} />
      </div>
    );
};
