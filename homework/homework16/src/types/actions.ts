import { UserType, ProfileResponse } from './dumMyApiResponses';

export interface Action {
  type: string
}

export interface ListActionType extends Action{
  newRecord?: string
}

export interface UsersAction extends Action{
  usersList?: Array<UserType>
  loading?: boolean
  error?: string
  curPage?: number
  limit?: number
  total?: number
  optionLimit?: string
}

export interface UserProfileAction extends Action {
  profile?: ProfileResponse
  loading?: boolean
  error?: string
}

export interface RegistrationAction extends Action {
  userId?: string
  redirect?: boolean
}
