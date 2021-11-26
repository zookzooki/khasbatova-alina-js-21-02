import { Dispatch } from 'redux';
import { UsersAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS, HIDE_LOADING, SET_LIMIT, SET_PAGE, SET_TOTAL, SELECT_LIMIT,
} from '../constants/actions/userList';
import { UserType } from '../types/dumMyApiResponses';
import { getUsersInfo } from '../api/dumMyApi';
import { idSelectOption } from '../constants/common';

const loadSuccessAction = (users: Array<UserType>): UsersAction => ({
  type: LOAD_USERS_SUCCESS,
  usersList: users,
});

const loadErrorAction = (error: string): UsersAction => ({
  type: LOAD_USERS_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});

const setLimitAction = (limit: number): UsersAction => ({
  type: SET_LIMIT,
  limit,
});

const setPageAction = (curPage: number): UsersAction => ({
  type: SET_PAGE,
  curPage,
});

const setTotalAction = (total: number): UsersAction => ({
  type: SET_TOTAL,
  total,
});

const selectLimitAction = (optionLimit: string): UsersAction => ({
  type: SELECT_LIMIT,
  optionLimit,
});

export const updateCurPage = (count: number) => (dispatch: Dispatch) => {
  dispatch(setPageAction(count));
};

export const updateLimit = (option: string) => (dispatch: Dispatch) => {
  let count;
  switch (option) {
    case idSelectOption.groupBy6:
      count = 6;
      break;
    case idSelectOption.groupBy20:
      count = 20;
      break;
    case idSelectOption.groupBy50:
      count = 50;
      break;
    default:
      count = 10;
      break;
  }
  dispatch(setLimitAction(count));
  dispatch(selectLimitAction(option));
};

export const load = (pageNum: number, pageSize: number) => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUsersInfo(pageNum, pageSize).then((resp: any) => {
    dispatch(loadSuccessAction(resp.data));
    dispatch(setLimitAction(resp.limit));
    dispatch(setPageAction(resp.page + 1));
    dispatch(setTotalAction(resp.total));
  })
    .catch((error: string) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoadingAction()));
};
