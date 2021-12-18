import { Dispatch } from 'redux';

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

export const load = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await getUserById(id);
    dispatch(loadSuccessAction(JSON.parse(resp)));
  } catch (e: any) {
    dispatch(loadErrorAction(e));
  } finally {
    dispatch(hideLoadingAction());
  }
};

export const updateProfile = (id: string, values: CardType) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await updateUser(id, values);
    dispatch(loadSuccessAction(JSON.parse(resp)));
  } catch (e: any) {
    dispatch(loadErrorAction(e.message));
  } finally {
    dispatch(hideLoadingAction());
  }
};
