import produce from 'immer';
import { RegistrationState } from '../types/state';
import { RegistrationAction } from '../types/actions';
import {
  GET_USER_ID, CHANGE_REDIRECT, CANCEL_REDIRECT,
} from '../constants/actions/registration';

const initialState: RegistrationState = {
  userId: '',
  redirect: false,
};

const getUserId = (draft: RegistrationState, id?:string) => {
  draft.userId = id || '';
  return draft;
};

const redirect = (draft: RegistrationState) => {
  draft.redirect = true;
  return draft;
};

const cancelRedirect = (draft: RegistrationState) => {
  draft.redirect = false;
  return draft;
};

export default (state = initialState, action: RegistrationAction) => produce(
  state,
  (draft: RegistrationState) => {
    switch (action.type) {
      case CHANGE_REDIRECT: return redirect(draft);
      case GET_USER_ID: return getUserId(draft, action.userId);
      case CANCEL_REDIRECT: return cancelRedirect(draft);
      default: return state;
    }
  },
);
