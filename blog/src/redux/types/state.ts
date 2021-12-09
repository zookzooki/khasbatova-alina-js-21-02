import {
  CardType, UserType, PostType, CommentType,
} from './dumMyApiResponses';

export interface SignInState {
  loading: boolean;
  isAuth: boolean;
  error: string;
  info: CardType;
  redirect: boolean;
}

export interface UserListState {
  list: Array<UserType>
  curPage: number
  total: number
  loading: boolean
  error?: string
}

export interface PostListState {
  list: Array<PostType>
  curPage: number
  total: number
  loading: boolean
  error?: string
}

export interface CommentListState {
  list: Array<CommentType>
  curPage: number
  total: number
  loading: boolean
  visibleModal: boolean
  error?: string
  post: PostType
}

export interface ProfileState {
  info: CardType
  loading: boolean
  error?: string
  visibleModal: boolean
}
