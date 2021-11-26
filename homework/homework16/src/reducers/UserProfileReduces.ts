import produce from 'immer';
import { UserState } from '../types/state';
import { UserProfileAction } from '../types/actions';
import {
  SHOWS_LOADING, LOAD_USER_ERROR, LOAD_USER_SUCCESS, HIDES_LOADING,
} from '../constants/actions/userProfile';
import { ProfileResponse } from '../types/dumMyApiResponses';
import { EMPTY_STRING } from '../constants/common';

const initialState: UserState = {
  profile: {},
  loading: false,
  error: EMPTY_STRING,
};

const showLoading = (draft: UserState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: UserState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: UserState, resp?:ProfileResponse) => {
  draft.profile = resp || {};
  draft.loading = false;
  return draft;
};

const loadError = (draft: UserState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: UserProfileAction) => produce(
  state,
  (draft: UserState) => {
    switch (action.type) {
      case SHOWS_LOADING: return showLoading(draft);
      case HIDES_LOADING: return hideLoading(draft);
      case LOAD_USER_SUCCESS: return loadSuccess(draft, action.profile);
      case LOAD_USER_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
