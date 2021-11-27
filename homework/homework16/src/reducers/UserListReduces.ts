import produce from 'immer';
import { UsersState } from '../types/state';
import { UsersAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS, HIDE_LOADING, SET_LIMIT, SET_PAGE, SET_TOTAL, SELECT_LIMIT,
} from '../constants/actions/userList';
import { UserType } from '../types/dumMyApiResponses';
import { EMPTY_STRING, idSelectOption } from '../constants/common';
import { PAGE_DEFAULT, LIMIT_DEFAULT } from '../constants/api/dumMyApi';

const initialState: UsersState = {
  usersList: [],
  loading: false,
  error: EMPTY_STRING,
  total: 0,
  curPage: PAGE_DEFAULT,
  limit: LIMIT_DEFAULT,
  optionLimit: idSelectOption.groupBy6,
};

const showLoading = (draft: UsersState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: UsersState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: UsersState, resp?:Array<UserType>) => {
  draft.usersList = resp || [];
  draft.loading = false;
  return draft;
};

const setLimit = (draft: UsersState, option?:number) => {
  draft.limit = option || LIMIT_DEFAULT;
  return draft;
};

const setPage = (draft: UsersState, count?:number) => {
  draft.curPage = count || PAGE_DEFAULT;
  return draft;
};

const setTotal = (draft: UsersState, count?:number) => {
  draft.total = count || 0;
  return draft;
};

const selectLimit = (draft: UsersState, option?:string) => {
  draft.optionLimit = option || idSelectOption.groupBy6;
  return draft;
};

const loadError = (draft: UsersState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: UsersAction) => produce(
  state,
  (draft: UsersState) => {
    switch (action.type) {
      case SHOW_LOADING: return showLoading(draft);
      case HIDE_LOADING: return hideLoading(draft);
      case LOAD_USERS_SUCCESS: return loadSuccess(draft, action.usersList);
      case LOAD_USERS_ERROR: return loadError(draft, action.error);
      case SET_LIMIT: return setLimit(draft, action.limit);
      case SET_PAGE: return setPage(draft, action.curPage);
      case SET_TOTAL: return setTotal(draft, action.total);
      case SELECT_LIMIT: return selectLimit(draft, action.optionLimit);
      default: return state;
    }
  },
);
