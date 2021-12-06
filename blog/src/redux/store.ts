import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import signIn from './reducers/signInReducer';
import userList from './reducers/userListReducer';
import postList from './reducers/postListReducer';
import commentList from './reducers/commentListReducer';
import profile from './reducers/profileReducer';

const middleware = () => (next: any) => (action: any) => {
  next(action);
};

const store = createStore(
  combineReducers(
    {
      signIn,
      userList,
      postList,
      commentList,
      profile,
    },
  ),
  composeWithDevTools(applyMiddleware(thunk, middleware)),
);

store.subscribe(() => {
  window.localStorage.setItem('blog', JSON.stringify(store.getState()));
});

export default store;
