import produce from 'immer';
import { CommentListState } from '../types/state';
import { CommentListAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_COMMENTS_ERROR, LOAD_COMMENTS_SUCCESS, HIDE_LOADING,
  SET_PAGE, SET_TOTAL, RESET, VISIBLE_MODAL, NOT_VISIBLE_MODAL, SET_POST,
} from '../constants/actions/commentList';
import { CommentType, PostType } from '../types/dumMyApiResponses';
import { EMPTY_STRING } from '../../constants/common';
import { PAGE_DEFAULT } from '../../constants/api/dumMyApi';

const initialState = () => {
  const state = {
    list: [],
    loading: false,
    error: EMPTY_STRING,
    total: 0,
    curPage: PAGE_DEFAULT,
    visibleModal: false,
    post: {},
  };
  // @ts-ignore
  const fromLS = JSON.parse(window?.localStorage?.getItem('blog'));
  return fromLS ? fromLS.commentList : state;
};

const showLoading = (draft: CommentListState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: CommentListState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft: CommentListState, resp?:Array<CommentType>) => {
  draft.list = resp || [];
  draft.loading = false;
  return draft;
};

const setPage = (draft: CommentListState, count?:number) => {
  draft.curPage = count || PAGE_DEFAULT;
  return draft;
};

const setPost = (draft: CommentListState, post?:PostType) => {
  draft.post = post || {};
  return draft;
};

const setTotal = (draft: CommentListState, count?:number) => {
  draft.total = count || 0;
  return draft;
};

const loadError = (draft: CommentListState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

const reset = (draft: CommentListState) => {
  draft.list = [];
  draft.error = EMPTY_STRING;
  draft.total = 0;
  draft.curPage = PAGE_DEFAULT;
  draft.visibleModal = false;
  draft.post = {};
  return draft;
};

const visibleModal = (draft: CommentListState, value?:boolean) => {
  draft.visibleModal = value || false;
  return draft;
};

export default (state = initialState(), action: CommentListAction) => produce(
  state,
  (draft: CommentListState) => {
    switch (action.type) {
      case SHOW_LOADING: return showLoading(draft);
      case HIDE_LOADING: return hideLoading(draft);
      case LOAD_COMMENTS_SUCCESS: return loadSuccess(draft, action.list);
      case LOAD_COMMENTS_ERROR: return loadError(draft, action.error);
      case SET_PAGE: return setPage(draft, action.curPage);
      case SET_TOTAL: return setTotal(draft, action.total);
      case VISIBLE_MODAL: return visibleModal(draft, true);
      case NOT_VISIBLE_MODAL: return visibleModal(draft, false);
      case RESET: return reset(draft);
      case SET_POST: return setPost(draft, action.post);
      default: return state;
    }
  },
);
