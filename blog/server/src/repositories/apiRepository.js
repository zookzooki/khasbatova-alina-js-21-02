const format = require('string-format');
const axios = require('axios');

const { app_id, app_id_field, base_url, user_url, post_url } = require('../../config/apiConfig');
const { get, post, put } = require('../../config/serverConfig');
const logger = require('../logger');
const {apiRepository: messages} = require('../constants/loggerMessages');

const doRequest = async (method, path, {body, searchParams} = {}) => {
  const url = new URL(path, base_url);
  if (searchParams) {
    url.search = new URLSearchParams(searchParams).toString();
  }
  return axios({
    url: url.toString(),
    method,
    headers: {
      [app_id_field]: app_id,
      'Content-Type': 'application/json',
    },
    data:  JSON.stringify(body),
  });
};

class ApiRepository {
  async getUserByIdThirdParty(id) {
    try {
      logger.info(format(messages.GET_USER_BY_ID_THIRD_PARTY_INVOKE, id));
      const apiResp = await doRequest(get, `${user_url}/${id}`);
      logger.info(format(messages.GET_USER_BY_ID_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.GET_USER_BY_ID_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }

  async createUserThirdParty(body) {
    try {
      logger.info(format(messages.CREATE_USER_THIRD_PARTY_INVOKE, JSON.stringify(body)));
      const apiResp = await doRequest(post, `${user_url}/create`, { body });
      logger.info(format(messages.CREATE_USER_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.CREATE_USER_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }

  async getPostsByUserThirdParty(id, page, limit) {
    try {
      logger.info(format(messages.GET_POSTS_BY_USER_THIRD_PARTY_INVOKE, id));
      const apiResp = await doRequest(get, `${user_url}/${id}/${post_url}`, {searchParams: { page: page-1, limit }});
      logger.info(format(messages.GET_POSTS_BY_USER_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.GET_POSTS_BY_USER_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }

  async updateUserThirdParty(id, body) {
    try {
      logger.info(format(messages.UPDATE_USER_THIRD_PARTY_INVOKE, id, JSON.stringify(body)));
      const apiResp = await doRequest(put, `${user_url}/${id}`, { body });
      logger.info(format(messages.UPDATE_USER_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.UPDATE_USER_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }

  async getUserListThirdParty(page, limit) {
    try {
      logger.info(format(messages.GET_USER_LIST_THIRD_PARTY_INVOKE, page, limit));
      const apiResp = await doRequest(get, `${user_url}`, {searchParams: { page: page-1, limit }});
      logger.info(format(messages.GET_USER_LIST_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.GET_USER_LIST_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }

  async getPostListThirdParty(page, limit) {
    try {
      logger.info(format(messages.GET_POST_LIST_THIRD_PARTY_INVOKE, page, limit));
      const apiResp = await doRequest(get, `${post_url}`, {searchParams: { page: page-1, limit }});
      logger.info(format(messages.GET_POST_LIST_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.GET_POST_LIST_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }

  async getCommentsByPostThirdParty(id, page, limit) {
    try {
      logger.info(format(messages.GET_COMMENTS_BY_POST_THIRD_PARTY_INVOKE, id, page, limit));
      const apiResp = await doRequest(get, `${post_url}/${id}/comment`, {searchParams: { page: page-1, limit }});
      logger.info(format(messages.GET_COMMENTS_BY_POST_THIRD_PARTY_REPLY_SUCCESS, JSON.stringify(apiResp.data)));
      return apiResp;
    } catch(e) {
      logger.info(format(messages.GET_COMMENTS_BY_POST_THIRD_PARTY_REPLY_ERROR, e));
      throw new Error(e.message);
    }
  }
}

module.exports = new ApiRepository();
