import { Dispatch } from 'redux';
import { UserListAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS, HIDE_LOADING, SET_PAGE, SET_TOTAL, RESET,
} from '../constants/actions/userList';
import { UserType } from '../types/dumMyApiResponses';
import { getUsersInfo } from '../../api/dumMyApi';
import { LIMIT_DEFAULT } from '../../constants/api/dumMyApi';

const loadSuccessAction = (users: Array<UserType>): UserListAction => ({
  type: LOAD_USERS_SUCCESS,
  list: users,
});

const loadErrorAction = (error: string): UserListAction => ({
  type: LOAD_USERS_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});

const setPageAction = (curPage: number): UserListAction => ({
  type: SET_PAGE,
  curPage,
});

const setTotalAction = (total: number): UserListAction => ({
  type: SET_TOTAL,
  total,
});

const resetInfoAction = () => ({
  type: RESET,
});

export const updateCurPage = (count: number) => (dispatch: Dispatch) => {
  dispatch(setPageAction(count));
};

export const reset = () => (dispatch: Dispatch) => {
  dispatch(resetInfoAction());
};

export const load = (pageNum: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await getUsersInfo(pageNum, LIMIT_DEFAULT);
    const data = JSON.parse(resp);
    dispatch(loadSuccessAction(data.data));
    dispatch(setPageAction(data.page));
    dispatch(setTotalAction(data.total));
  } catch (e: any) {
    dispatch(loadErrorAction(e.message));
  } finally {
    dispatch(hideLoadingAction());
  }
};
