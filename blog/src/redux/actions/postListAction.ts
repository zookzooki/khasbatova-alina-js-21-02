import { Dispatch } from 'redux';
import { PostListAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_POSTS_ERROR, LOAD_POSTS_SUCCESS, HIDE_LOADING, SET_PAGE, SET_TOTAL, RESET,
} from '../constants/actions/postList';
import { PostType } from '../types/dumMyApiResponses';
import { getPostList, getPostsByUser } from '../../api/dumMyApi';
import { LIMIT_DEFAULT } from '../../constants/api/dumMyApi';

const loadSuccessAction = (posts: Array<PostType>): PostListAction => ({
  type: LOAD_POSTS_SUCCESS,
  list: posts,
});

const loadErrorAction = (error: string): PostListAction => ({
  type: LOAD_POSTS_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});

const setPageAction = (curPage: number): PostListAction => ({
  type: SET_PAGE,
  curPage,
});

const setTotalAction = (total: number): PostListAction => ({
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

export const loadByUser = (id: string, pageNum: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await getPostsByUser(id, pageNum, LIMIT_DEFAULT);
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

export const load = (pageNum: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    const resp = await getPostList(pageNum, LIMIT_DEFAULT);
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
