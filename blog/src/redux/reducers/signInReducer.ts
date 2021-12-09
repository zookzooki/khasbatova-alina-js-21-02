import produce from 'immer';

import {
  SHOW_LOADING, LOAD_USER_ERROR, LOAD_USER_SUCCESS, HIDE_LOADING, RESET_INFO, CHANGE_REDIRECT, CANCEL_REDIRECT,
} from '../constants/actions/signIn';
import { SignInAction } from '../types/actions';
import { SignInState } from '../types/state';
import { EMPTY_STRING } from '../../constants/common';
import { CardType } from '../types/dumMyApiResponses';

const initialState = () => {
  const state = {
    loading: false,
    error: EMPTY_STRING,
    isAuth: false,
    info: {},
  };
  // @ts-ignore
  const fromLS = JSON.parse(window?.localStorage?.getItem('blog'));
  return fromLS ? fromLS.signIn : state;
};

const showLoading = (draft: SignInState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: SignInState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: SignInState, resp?:CardType) => {
  draft.info = resp || {};
  draft.loading = false;
  draft.isAuth = true;
  draft.error = '';
  return draft;
};

const reset = (draft: SignInState) => {
  draft.info = {};
  draft.isAuth = false;
  return draft;
};

const loadError = (draft: SignInState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

const redirect = (draft: SignInState) => {
  draft.redirect = true;
  return draft;
};

const cancelRedirect = (draft: SignInState) => {
  draft.redirect = false;
  return draft;
};

export default (state = initialState(), action: SignInAction) => produce(
  state,
  (draft: SignInState) => {
    switch (action.type) {
      case SHOW_LOADING: return showLoading(draft);
      case HIDE_LOADING: return hideLoading(draft);
      case LOAD_USER_SUCCESS: return loadSuccess(draft, action.info);
      case LOAD_USER_ERROR: return loadError(draft, action.error);
      case RESET_INFO: return reset(draft);
      case CHANGE_REDIRECT: return redirect(draft);
      case CANCEL_REDIRECT: return cancelRedirect(draft);
      default: return state;
    }
  },
);
