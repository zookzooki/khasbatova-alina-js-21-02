const format = require('string-format');

const ApiRepository = require('../repositories/apiRepository');
const logger = require('../logger');
const PostMapper = require('../mappers/postMapper');
const { postService: messages } = require('../constants/loggerMessages');

class PostService {
    async getPostList(req, res) {
        try {
            logger.info(format(messages.GET_POST_LIST_INPUT_PARAMS, req.query.page, req.query.limit));
            const resp = await ApiRepository.getPostListThirdParty(req.query.page, req.query.limit);
            logger.info(format(messages.GET_POST_LIST_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = PostMapper.mapThirdPartyPostList(resp.data);
            logger.info(format(messages.GET_POST_LIST_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.GET_POST_LIST_FAIL, 400, JSON.stringify(result)));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.GET_POST_LIST_ERROR, 400, e));
            return res.status(400).send(e.message);
        }
    }

    async getCommentsByPost(req, res) {
        try {
            logger.info(format(messages.GET_COMMENTS_BY_POST_INPUT_PARAMS, req.params.id, req.query.page, req.query.limit));
            const resp = await ApiRepository.getCommentsByPostThirdParty(req.params.id, req.query.page, req.query.limit);
            logger.info(format(messages.GET_COMMENTS_BY_POST_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = PostMapper.mapThirdPartyPostList(resp.data);
            logger.info(format(messages.GET_COMMENTS_BY_POST_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.GET_COMMENTS_BY_POST_FAIL, 400, JSON.stringify(result)));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.GET_COMMENTS_BY_POST_ERROR, 400, e));
            return res.status(400).send(e.message);
        }
    }
}

module.exports = new PostService();
