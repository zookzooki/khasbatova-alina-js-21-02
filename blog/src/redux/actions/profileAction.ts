import { Dispatch } from 'redux';
import moment from 'moment';

import { ProfileAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_PROFILE_ERROR, LOAD_PROFILE_SUCCESS, HIDE_LOADING, RESET, VISIBLE_MODAL, NOT_VISIBLE_MODAL,
} from '../constants/actions/profile';
import { CardType } from '../types/dumMyApiResponses';
import { getUserById, updateUser } from '../../api/dumMyApi';

const loadSuccessAction = (user: CardType): ProfileAction => ({
  type: LOAD_PROFILE_SUCCESS,
  info: user,
});

const loadErrorAction = (error: string): ProfileAction => ({
  type: LOAD_PROFILE_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});

const visibleModalAction = () => ({
  type: VISIBLE_MODAL,
});

const notVisibleModalAction = () => ({
  type: NOT_VISIBLE_MODAL,
});

const resetInfoAction = () => ({
  type: RESET,
});

export const reset = () => (dispatch: Dispatch) => {
  dispatch(resetInfoAction());
};

export const visibleModal = () => (dispatch: Dispatch) => {
  dispatch(visibleModalAction());
};

export const notVisibleModal = () => (dispatch: Dispatch) => {
  dispatch(notVisibleModalAction());
};

export const load = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserById(id).then((resp: any) => {
    dispatch(loadSuccessAction(resp));
  })
    .catch((error: Error) => dispatch(loadErrorAction(error.message)))
    .finally(() => dispatch(hideLoadingAction()));
};

export const updateProfile = (id: string, values: CardType) => (dispatch: Dispatch) => {
  const {
    firstName, lastName, phone, gender, picture,
  } = values;

  const dateOfBirth = moment(values.dateOfBirth).toISOString();
  dispatch(showLoadingAction());
  updateUser(id, {
    firstName, lastName, phone, gender, picture, dateOfBirth,
  }).then((resp: any) => {
    dispatch(loadSuccessAction(resp));
  })
    .catch((error: Error) => dispatch(loadErrorAction(error.message)))
    .finally(() => dispatch(hideLoadingAction()));
};
