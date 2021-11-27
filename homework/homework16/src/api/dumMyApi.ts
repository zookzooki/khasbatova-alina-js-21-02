import {
  APP_ID_FIELD, APP_ID_VALUE, USER_URL, LIMIT_FIELD, PAGE_FIELD, BASE_URL,
} from '../constants/api/dumMyApi';
import { METHOD_GET } from '../constants/api/common';
import { ProfileResponse } from '../types/dumMyApiResponses';

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
  }).then((resp) => resp.json());
};

const doPostRequest = <T>(
  path: string,
  body: T,
) => {
  const url = new URL(path, BASE_URL);
  const bodyInfo = JSON.stringify(body);
  return fetch(url.toString(), {
    method: 'POST',
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
      'Content-Type': 'application/json',
    }),
    body: bodyInfo,
  }).then((resp) => resp.json());
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
  body: ProfileResponse,
) => doPostRequest(`${USER_URL}/create`, body);
