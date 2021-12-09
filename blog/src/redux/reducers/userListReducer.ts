import produce from 'immer';
import { UserListState } from '../types/state';
import { UserListAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS, HIDE_LOADING, SET_PAGE, SET_TOTAL, RESET,
} from '../constants/actions/userList';
import { UserType } from '../types/dumMyApiResponses';
import { EMPTY_STRING } from '../../constants/common';
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';

const initialState = () => {
  const state = {
    list: [],
    loading: false,
    error: EMPTY_STRING,
    total: 0,
    curPage: PAGE_DEFAULT,
  };
  // @ts-ignore
  const fromLS = JSON.parse(window?.localStorage?.getItem('blog'));
  return fromLS ? fromLS.userList : state;
};

const showLoading = (draft: UserListState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: UserListState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: UserListState, resp?:Array<UserType>) => {
  draft.list = resp || [];
  draft.loading = false;
  return draft;
};

const setPage = (draft: UserListState, count?:number) => {
  draft.curPage = count || PAGE_DEFAULT;
  return draft;
};

const setTotal = (draft: UserListState, count?:number) => {
  draft.total = count || 0;
  return draft;
};

const loadError = (draft: UserListState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

const reset = (draft: UserListState) => {
  draft.list = [];
  draft.error = EMPTY_STRING;
  draft.total = 0;
  draft.curPage = PAGE_DEFAULT;
  return draft;
};

export default (state = initialState(), action: UserListAction) => produce(
  state,
  (draft: UserListState) => {
    switch (action.type) {
      case SHOW_LOADING: return showLoading(draft);
      case HIDE_LOADING: return hideLoading(draft);
      case LOAD_USERS_SUCCESS: return loadSuccess(draft, action.list);
      case LOAD_USERS_ERROR: return loadError(draft, action.error);
      case SET_PAGE: return setPage(draft, action.curPage);
      case SET_TOTAL: return setTotal(draft, action.total);
      case RESET: return reset(draft);
      default: return state;
    }
  },
);
