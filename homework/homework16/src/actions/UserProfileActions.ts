import { Dispatch } from 'redux';
import { UserProfileAction } from '../types/actions';
import {
  SHOWS_LOADING, LOAD_USER_ERROR, LOAD_USER_SUCCESS, HIDES_LOADING,
} from '../constants/actions/userProfile';
import { ProfileResponse } from '../types/dumMyApiResponses';
import { getUserById } from '../api/dumMyApi';

const loadSuccessAction = (user: ProfileResponse): UserProfileAction => ({
  type: LOAD_USER_SUCCESS,
  profile: user,
});

const loadErrorAction = (error: string): UserProfileAction => ({
  type: LOAD_USER_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOWS_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDES_LOADING,
});

export const load = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserById(id).then((resp: any) => {
    dispatch(loadSuccessAction(resp));
  })
    .catch((error: string) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};
