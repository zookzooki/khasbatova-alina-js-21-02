import { Dispatch } from 'redux';
import moment from 'moment';

import { SignInAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_USER_ERROR, LOAD_USER_SUCCESS, HIDE_LOADING, RESET_INFO, CHANGE_REDIRECT, CANCEL_REDIRECT,
} from '../constants/actions/signIn';
import { CardType } from '../types/dumMyApiResponses';
import { getUserById, createUser } from '../../api/dumMyApi';

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

export const load = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserById(id).then((resp: any) => {
    dispatch(loadSuccessAction(resp));
    dispatch(redirectAction());
  })
    .catch((error: Error) => {
      dispatch(loadErrorAction(error.message));
    })
    .finally(() => {
      dispatch(hideLoadingAction());
      dispatch(cancelRedirectAction());
    });
};

export const create = (values: CardType) => (dispatch: Dispatch) => {
  const {
    firstName, lastName, email, phone, gender,
  } = values;
  const dateOfBirth = moment(values.dateOfBirth).toISOString();
  dispatch(showLoadingAction());
  createUser({
    firstName, lastName, email, phone, gender, dateOfBirth,
  }).then((resp: any) => {
    dispatch(loadSuccessAction(resp));
    dispatch(redirectAction());
  }).catch((error: Error) => {
    dispatch(loadErrorAction(error.message));
  })
    .finally(() => {
      dispatch(hideLoadingAction());
      dispatch(cancelRedirectAction());
    });
};

export const reset = () => (dispatch: Dispatch) => {
  dispatch(resetInfoAction());
};
