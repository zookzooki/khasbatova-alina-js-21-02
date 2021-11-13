export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface UserType {
  id?: string;
  title?: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | '';
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface ProfileResponse {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  picture?: string;
}

export interface PostListResponse extends ListResponseType<UserType> {}

export interface ResponseError {
  error: string;
}
