import produce from 'immer';
import { PostListState } from '../types/state';
import { PostListAction } from '../types/actions';
import {
  SHOW_LOADING, LOAD_POSTS_ERROR, LOAD_POSTS_SUCCESS, HIDE_LOADING, SET_PAGE, SET_TOTAL, RESET,
} from '../constants/actions/postList';
import { PostType } from '../types/dumMyApiResponses';
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
  return fromLS ? fromLS.postList : state;
};

const showLoading = (draft: PostListState) => {
  draft.loading = true;
  return draft;
};

const hideLoading = (draft: PostListState) => {
  draft.loading = false;
  return draft;
};

const loadSuccess = (draft:PostListState, resp?:Array<PostType>) => {
  draft.list = resp || [];
  draft.loading = false;
  return draft;
};

const setPage = (draft: PostListState, count?:number) => {
  draft.curPage = count || PAGE_DEFAULT;
  return draft;
};

const setTotal = (draft: PostListState, count?:number) => {
  draft.total = count || 0;
  return draft;
};

const loadError = (draft: PostListState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

const reset = (draft: PostListState) => {
  draft.list = [];
  draft.error = EMPTY_STRING;
  draft.total = 0;
  draft.curPage = PAGE_DEFAULT;
  return draft;
};

export default (state = initialState(), action: PostListAction) => produce(
  state,
  (draft: PostListState) => {
    switch (action.type) {
      case SHOW_LOADING: return showLoading(draft);
      case HIDE_LOADING: return hideLoading(draft);
      case LOAD_POSTS_SUCCESS: return loadSuccess(draft, action.list);
      case LOAD_POSTS_ERROR: return loadError(draft, action.error);
      case SET_PAGE: return setPage(draft, action.curPage);
      case SET_TOTAL: return setTotal(draft, action.total);
      case RESET: return reset(draft);
      default: return state;
    }
  },
);
