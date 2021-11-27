import { UserType, ProfileResponse } from './dumMyApiResponses';

export interface State {
  list: ListState;
  users: UsersState;
  user: UserState;
  registration: RegistrationState;
}

export interface ListState {
  records: Array<string>;
}

export interface UsersState {
  usersList: Array<UserType>
  curPage: number
  limit: number
  total: number
  loading: boolean
  optionLimit: string
  error?: string
}

export interface UserState {
  profile: ProfileResponse
  loading: boolean
  error?: string
}

export interface RegistrationState {
  userId: string
  redirect: boolean
}
