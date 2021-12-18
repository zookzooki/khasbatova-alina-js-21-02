import { Dispatch } from 'redux';

import { SignInAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_USER_ERROR, LOAD_USER_SUCCESS, HIDE_LOADING, RESET_INFO, CHANGE_REDIRECT, CANCEL_REDIRECT,
} from '../constants/actions/signIn';
import { CardType } from '../types/dumMyApiResponses';
import { getUserByIdShort, createUser } from '../../api/dumMyApi';

const loadSuccessAction = (user: CardType): SignInAction => ({
  type: LOAD_USER_SUCCESS,
  info: user,
});

const loadErrorAction = (error: string): SignInAction => ({
  type: LOAD_USER_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});

const resetInfoAction = () => ({
  type: RESET_INFO,
});

const redirectAction = () => ({
  type: CHANGE_REDIRECT,
});

const cancelRedirectAction = () => ({
  type: CANCEL_REDIRECT,
});

export const load = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await getUserByIdShort(id);
    dispatch(loadSuccessAction(JSON.parse(resp)));
    dispatch(redirectAction());
  } catch (e: any) {
    dispatch(loadErrorAction(e.message));
  } finally {
    dispatch(hideLoadingAction());
    dispatch(cancelRedirectAction());
  }
};

export const create = (values: CardType) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await createUser(values);
    dispatch(loadSuccessAction(JSON.parse(resp)));
    dispatch(redirectAction());
  } catch (e: any) {
    dispatch(loadErrorAction(e.message));
  } finally {
    dispatch(hideLoadingAction());
    dispatch(cancelRedirectAction());
  }
};

export const reset = () => (dispatch: Dispatch) => {
  dispatch(resetInfoAction());
};
