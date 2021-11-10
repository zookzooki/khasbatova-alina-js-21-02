import {
  APP_ID_FIELD, APP_ID_VALUE, USER_URL, LIMIT_FIELD, PAGE_FIELD,
} from '../constants/api/dumMyApi';
import { METHOD_GET } from '../constants/api/common';
import { PostListResponse } from '../types/dumMyApiResponses';

export const getUsersInfo = (
  page: number,
  limit: number,
  callback: (resp: PostListResponse) => void,
  errorCallback?: (resp: any) => void,
) => fetch(`${USER_URL}?${PAGE_FIELD}=${(page - 1).toString()}&${LIMIT_FIELD}=${limit.toString()}`, {
  method: METHOD_GET,
  headers: new Headers({
    [APP_ID_FIELD]: APP_ID_VALUE,
  }),
}).then((response) => response.json())
  .then((response: PostListResponse) => callback(response))
  .catch(errorCallback);
