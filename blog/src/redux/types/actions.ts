import {
  CardType, UserType, PostType, CommentType,
} from './dumMyApiResponses';

export interface Action {
  type: string
}

export interface SignInAction extends Action {
  info?: CardType
  loading?: boolean
  error?: string
  redirect?: boolean
}

export interface UserListAction extends Action{
  list?: Array<UserType>
  loading?: boolean
  error?: string
  curPage?: number
  total?: number
}

export interface SignUpAction extends Action {
  info?: CardType
  redirect?: boolean
  loading?: boolean
  error?: string
}

export interface PostListAction extends Action {
  list?: Array<PostType>
  loading?: boolean
  error?: string
  curPage?: number
  total?: number
}

export interface CommentListAction extends Action {
  list?: Array<CommentType>
  loading?: boolean
  error?: string
  curPage?: number
  total?: number
  visibleModal?: boolean
  post?: PostType
}

export interface ProfileAction extends Action {
  info?: CardType
  loading?: boolean
  error?: string
  visibleModal?: boolean
}
