const format = require('string-format');
const moment = require('moment');

const ApiRepository = require('../repositories/apiRepository');
const logger = require('../logger');
const UserMapper = require('../mappers/userMapper');
const { userService: messages } = require('../constants/loggerMessages');

class UserService {
    async getUserByIdShort(req, res) {
        try {
            logger.info(format(messages.GET_USER_BY_ID_SHORT_INPUT_PARAMS, req.params.id));
            const resp = await ApiRepository.getUserByIdThirdParty(req.params.id);
            logger.info(format(messages.GET_USER_BY_ID_SHORT_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = UserMapper.mapThirdPartyUserToUserShort(resp.data);
            logger.info(format(messages.GET_USER_BY_ID_SHORT_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.GET_USER_BY_ID_SHORT_FAIL, 400, JSON.stringify(result)));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.GET_USER_BY_ID_SHORT_ERROR, 400, e));
            return res.status(400).send(JSON.stringify(e.message));
        }
    }

    async getUserById(req, res) {
        try {
            logger.info(format(messages.GET_USER_BY_ID_INPUT_PARAMS, req.params.id));
            const resp = await ApiRepository.getUserByIdThirdParty(req.params.id);
            logger.info(format(messages.GET_USER_BY_ID_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = UserMapper.mapThirdPartyUserToUser(resp.data);
            logger.info(format(messages.GET_USER_BY_ID_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.GET_USER_BY_ID_FAIL, 400, JSON.stringify(result)));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.GET_USER_BY_ID_ERROR, 400, e));
            return res.status(400).send(JSON.stringify(e.message));
        }
    }

    async createUser(req, res) {
        try {
            const { firstName, lastName, email } = req.body;
            const data = { firstName, lastName, email };
            if (req.body.dateOfBirth) {
                data.dateOfBirth = moment(req.body.dateOfBirth).toISOString();
            }
            if (req.body.gender) {
                data.gender = req.body.gender;
            }
            logger.info(format(messages.CREATE_USER_INPUT_PARAMS, JSON.stringify(data)));
            const resp = await ApiRepository.createUserThirdParty(data);
            logger.info(format(messages.CREATE_USER_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = UserMapper.mapThirdPartyUserToUserShort(resp.data);
            logger.info(format(messages.CREATE_USER_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.CREATE_USER_FAIL, 400, result));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.CREATE_USER_ERROR, 400, e));
            return res.status(400).send(JSON.stringify(e.message));
        }
    }

    async getPostsByUser(req, res) {
        try {
            logger.info(format(messages.GET_POST_BY_USER_INPUT_PARAMS, req.params.id));
            const resp = await ApiRepository.getPostsByUserThirdParty(req.params.id, req.query.page, req.query.limit);
            logger.info(format(messages.GET_POST_BY_USER_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = UserMapper.mapThirdPartyPostList(resp.data);
            logger.info(format(messages.GET_POST_BY_USER_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.GET_POST_BY_USER_FAIL, 400, JSON.stringify(result)));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.GET_POST_BY_USER_ERROR, 400, e));
            return res.status(400).send(JSON.stringify(e.message));
        }
    }

    async updateUser(req, res) {
        try {
            const { firstName, lastName, phone, gender, picture } = req.body;
            const data = { firstName, lastName, phone, picture };
            if (req.body.dateOfBirth) {
                data.dateOfBirth = moment(req.body.dateOfBirth).toISOString();
            }
            if (req.body.gender) {
                data.gender = req.body.gender;
            }
            logger.info(format(messages.UPDATE_USER_INPUT_PARAMS, req.params.id, JSON.stringify(data)));
            const resp = await ApiRepository.updateUserThirdParty(req.params.id, data);
            logger.info(format(messages.UPDATE_USER_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = UserMapper.mapThirdPartyUserToUser(resp.data);
            logger.info(format(messages.UPDATE_USER_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.UPDATE_USER_FAIL, 400, result));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.UPDATE_USER_ERROR, 400, e));
            return res.status(400).send(JSON.stringify(e.message));
        }
    }

    async getUserList(req, res) {
        try {
            logger.info(format(messages.GET_USER_LIST_INPUT_PARAMS, req.query.page, req.query.limit));
            const resp = await ApiRepository.getUserListThirdParty(req.query.page, req.query.limit);
            logger.info(format(messages.GET_USER_LIST_SUCCESS, 201, JSON.stringify(resp.data)));
            const result = UserMapper.mapThirdPartyUserList(resp.data);
            logger.info(format(messages.GET_USER_LIST_RESULT, JSON.stringify(result)));
            if (resp.statusText === 'OK') {
                return res.status(201).json(result);
            } else {
                logger.info(format(messages.GET_USER_LIST_FAIL, 400, JSON.stringify(result)));
                return res.status(400).send(result);
            }
        } catch(e) {
            logger.info(format(messages.GET_USER_LIST_ERROR, 400, e));
            return res.status(400).send(JSON.stringify(e.message));
        }
    }
}

module.exports = new UserService();
