import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './UserProfile.css';
import { load } from '../../actions/UserProfileActions';

interface Params {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  picture?: string;
  className?: string;
}

export const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams<Params>();
  const history = useHistory();
  const profile = useSelector((state: any) => state.user.profile);
  const loading = useSelector((state: any) => state.user.loading);
  const error = useSelector((state: any) => state.user.error);

  useEffect(() => {
    dispatch(load(params.id));
  }, []);

  return (
    <div className="user-form">
      <button className="backButton" type="button" onClick={history.goBack}>Назад</button>
      {
        error ? <div>{error}</div> : loading
          ? 'загрузка'
          : (
            <div className="profile">
              { (profile.picture) ? <img alt="аватарка" src={profile.picture} /> : ''}
              <div>
                <p>{`${profile.title ? profile.title : ''} ${profile.firstName} ${profile.lastName}`}</p>
                { profile.gender ? <p>{profile.gender}</p> : ''}
                <p>{`Date of birth: ${profile.dateOfBirth ? profile.dateOfBirth : '-'}`}</p>
                <p>{`Register date: ${profile.registerDate}`}</p>
                <p>{`Email: ${profile.email}`}</p>
                <p>{`Phone: ${profile.phone ? profile.phone : '-'}`}</p>
              </div>
            </div>
          )
}
    </div>
  );
};
