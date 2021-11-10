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

export interface PostListResponse extends ListResponseType<UserType> {}
