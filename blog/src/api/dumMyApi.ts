import {
  APP_ID_FIELD, APP_ID_VALUE, USER_URL, POST_URL, COMMENT_URL, BASE_URL, LIMIT_FIELD, PAGE_FIELD,
} from '../constants/api/dumMyApi';
import { METHOD_GET } from '../constants/api/common';
import { CardType } from '../redux/types/dumMyApiResponses';

const doGetRequest = (
  path: string,
  searchParams?: Record<string, any>,
) => {
  const url = new URL(path, BASE_URL);
  url.search = new URLSearchParams(searchParams).toString();
  return fetch(url.toString(), {
    method: METHOD_GET,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
    }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    throw new Error('Bad response from server');
  });
};

const doChangeRequest = <T>(
  method: string,
  path: string,
  body: T,
) => {
  const url = new URL(path, BASE_URL);
  const bodyInfo = JSON.stringify(body);
  return fetch(url.toString(), {
    method,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
      'Content-Type': 'application/json',
    }),
    body: bodyInfo,
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    throw new Error('Bad response from server');
  });
};

export const getUsersInfo = (
  page: number,
  limit: number,
) => doGetRequest(
  USER_URL,
  {
    [PAGE_FIELD]: page - 1,
    [LIMIT_FIELD]: limit,
  },
);

export const getUserById = (
  id: string,
) => doGetRequest(`${USER_URL}/${id}`);

export const createUser = (
  body: CardType,
) => doChangeRequest('POST', `${USER_URL}/create`, body);

export const updateUser = (
  id: string,
  body: CardType,
) => doChangeRequest('PUT', `${USER_URL}/${id}`, body);

export const getPostList = (
  page: number,
  limit: number,
) => doGetRequest(
  POST_URL,
  {
    [PAGE_FIELD]: page - 1,
    [LIMIT_FIELD]: limit,
  },
);

export const getCommentsByPost = (
  id: string,
  page: number,
  limit: number,
) => doGetRequest(
  `${POST_URL}/${id}/${COMMENT_URL}`,
  {
    [PAGE_FIELD]: page - 1,
    [LIMIT_FIELD]: limit,
  },
);

export const getPostsByUser = (
  id: string,
  page: number,
  limit: number,
) => doGetRequest(
  `${USER_URL}/${id}/${POST_URL}`,
  {
    [PAGE_FIELD]: page - 1,
    [LIMIT_FIELD]: limit,
  },
);
