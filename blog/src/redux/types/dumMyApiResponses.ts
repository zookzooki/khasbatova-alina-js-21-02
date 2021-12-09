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

export interface CardType {
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

export interface UserListResponse extends ListResponseType<UserType> {}

export interface ResponseError {
  error: string;
}

export interface PostType {
  id?: string;
  image?: string;
  text?: string;
  publishDate?: string;
  owner?: UserType;
}

export interface PostListResponse extends ListResponseType<PostType> {}

export interface CommentType {
  id?: string;
  message?: string;
  post?: string;
  publishDate?: string;
  owner?: UserType;
}

export interface CommentListResponse extends ListResponseType<CommentType> {}
