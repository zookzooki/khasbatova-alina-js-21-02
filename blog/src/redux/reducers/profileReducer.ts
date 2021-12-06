import produce from 'immer';
import { ProfileState } from '../types/state';
import { ProfileAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_PROFILE_ERROR, LOAD_PROFILE_SUCCESS, HIDE_LOADING, RESET, VISIBLE_MODAL, NOT_VISIBLE_MODAL,
} from '../constants/actions/profile';
import { CardType } from '../types/dumMyApiResponses';
import { EMPTY_STRING } from '../../constants/common';

const initialState = () => {
  const state = {
    info: {},
    loading: false,
    error: EMPTY_STRING,
    visibleModal: false,
  };
  // @ts-ignore
  const fromLS = JSON.parse(window?.localStorage?.getItem('blog'));
  return fromLS ? fromLS.profile : state;
};

const showLoading = (draft: ProfileState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: ProfileState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: ProfileState, resp?:CardType) => {
  draft.info = resp || {};
  draft.loading = false;
  return draft;
};

const loadError = (draft: ProfileState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

const reset = (draft: ProfileState) => {
  draft.info = {};
  draft.error = EMPTY_STRING;
  draft.visibleModal = false;
  return draft;
};

const visibleModal = (draft: ProfileState, value?:boolean) => {
  draft.visibleModal = value || false;
  return draft;
};

export default (state = initialState(), action: ProfileAction) => produce(
  state,
  (draft: ProfileState) => {
    switch (action.type) {
      case SHOW_LOADING: return showLoading(draft);
      case HIDE_LOADING: return hideLoading(draft);
      case LOAD_PROFILE_SUCCESS: return loadSuccess(draft, action.info);
      case LOAD_PROFILE_ERROR: return loadError(draft, action.error);
      case VISIBLE_MODAL: return visibleModal(draft, true);
      case NOT_VISIBLE_MODAL: return visibleModal(draft, false);
      case RESET: return reset(draft);
      default: return state;
    }
  },
);
