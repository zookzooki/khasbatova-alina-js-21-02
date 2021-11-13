import {
  APP_ID_FIELD, APP_ID_VALUE, USER_URL, LIMIT_FIELD, PAGE_FIELD, BASE_URL,
} from '../constants/api/dumMyApi';
import { METHOD_GET } from '../constants/api/common';
import { PostListResponse, ResponseError, ProfileResponse } from '../types/dumMyApiResponses';

const doGetRequest = <T>(
  path: string,
  callback: (resp: T) => void,
  errorCallback?: (resp: ResponseError) => void,
  finalCallback?: () => void,
  searchParams?: Record<string, any>,
) => {
  const url = new URL(path, BASE_URL);
  url.search = new URLSearchParams(searchParams).toString();
  fetch(url.toString(), {
    method: METHOD_GET,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
    }),
  }).then((resp) => resp.json())
    .then(callback)
    .catch(errorCallback)
    .finally(finalCallback);
};

export const getUsersInfo = (
  page: number,
  limit: number,
  callback: (resp: PostListResponse) => void,
  errorCallback?: (resp: any) => void,
  finalCallback?: () => void,
) => {
  doGetRequest(
    USER_URL,
    (resp: PostListResponse) => callback(resp),
    errorCallback,
    finalCallback,
    {
      [PAGE_FIELD]: page - 1,
      [LIMIT_FIELD]: limit,
    },
  );
};

export const getUserById = (
  id: string,
  callback: (resp: ProfileResponse) => void,
  errorCallback?: (resp: ResponseError) => void,
  finalCallback?: () => void,
) => {
  doGetRequest(`${USER_URL}/${id}`, callback, errorCallback, finalCallback);
};
