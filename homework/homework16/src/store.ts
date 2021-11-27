import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import users from './reducers/UserListReduces';
import user from './reducers/UserProfileReduces';
import registration from './reducers/RegistrationReduces';

const middleware = () => (next: any) => (action: any) => {
  next(action);
};

const store = createStore(
  combineReducers(
    {
      users, user, registration,
    },
  ),
  applyMiddleware(thunk, middleware),
);

export default store;
