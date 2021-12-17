import { Dispatch } from 'redux';
import { CommentListAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_COMMENTS_ERROR, LOAD_COMMENTS_SUCCESS, HIDE_LOADING, SET_PAGE, SET_TOTAL,
  RESET, VISIBLE_MODAL, NOT_VISIBLE_MODAL, SET_POST,
} from '../constants/actions/commentList';
import { CommentType, PostType } from '../types/dumMyApiResponses';
import { getCommentsByPost } from '../../api/dumMyApi';
import { LIMIT_DEFAULT } from '../../constants/api/dumMyApi';

const loadSuccessAction = (comments: Array<CommentType>): CommentListAction => ({
  type: LOAD_COMMENTS_SUCCESS,
  list: comments,
});

const loadErrorAction = (error: string): CommentListAction => ({
  type: LOAD_COMMENTS_ERROR,
  error,
});

const showLoadingAction = () => ({
  type: SHOW_LOADING,
});

const hideLoadingAction = () => ({
  type: HIDE_LOADING,
});

const setPageAction = (curPage: number): CommentListAction => ({
  type: SET_PAGE,
  curPage,
});

const setTotalAction = (total: number): CommentListAction => ({
  type: SET_TOTAL,
  total,
});

const resetInfoAction = () => ({
  type: RESET,
});

const visibleModalAction = () => ({
  type: VISIBLE_MODAL,
});

const notVisibleModalAction = () => ({
  type: NOT_VISIBLE_MODAL,
});

const setPostAction = (post: PostType): CommentListAction => ({
  type: SET_POST,
  post,
});

export const updateCurPage = (count: number) => (dispatch: Dispatch) => {
  dispatch(setPageAction(count));
};

export const reset = () => (dispatch: Dispatch) => {
  dispatch(resetInfoAction());
};

export const visibleModal = () => (dispatch: Dispatch) => {
  dispatch(visibleModalAction());
};

export const notVisibleModal = () => (dispatch: Dispatch) => {
  dispatch(notVisibleModalAction());
};

export const load = (post: PostType, pageNum: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoadingAction());
    dispatch(setPostAction(post));
    const resp = await getCommentsByPost(post.id ? post.id : '', pageNum, LIMIT_DEFAULT);
    const data = JSON.parse(resp);
    console.log('RESP', data);
    dispatch(loadSuccessAction(data.data));
    dispatch(setPageAction(data.page));
    dispatch(setTotalAction(data.total));
  } catch (e: any) {
    dispatch(loadErrorAction(e.message));
  } finally {
    dispatch(hideLoadingAction());
  }
};
