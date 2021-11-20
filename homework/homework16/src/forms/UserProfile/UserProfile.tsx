import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './UserProfile.css';
import { ResponseError, ProfileResponse } from '../../types/dumMyApiResponses';
import { getUserById } from '../../api/dumMyApi';

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

const UserProfile = () => {
  const [user, setUser] = useState({} as ProfileResponse);
  const [loading, setLoading] = useState(true);
  const params = useParams<Params>();
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    getUserById(params.id, setUser, ({ error }: ResponseError) => console.log(error), () => setLoading(false));
  }, []);
  return (
    <div className="user-form">
      <button className="backButton" type="button" onClick={history.goBack}>Назад</button>
      {loading ? 'Идёт загрузка'
        : (
          <div className="profile">
            { (user.picture) ? <img alt="аватарка" src={user.picture} /> : ''}
            <div>
              <p>{`${user.title ? user.title : ''} ${user.firstName} ${user.lastName}`}</p>
              { user.gender ? <p>{user.gender}</p> : ''}
              <p>{`Date of birth: ${user.dateOfBirth ? user.dateOfBirth : '-'}`}</p>
              <p>{`Register date: ${user.registerDate}`}</p>
              <p>{`Email: ${user.email}`}</p>
              <p>{`Phone: ${user.phone ? user.phone : '-'}`}</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default UserProfile;
