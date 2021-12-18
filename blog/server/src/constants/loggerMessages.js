module.exports = {
  postService: {
    GET_POST_LIST_INPUT_PARAMS: '[UserService.getPostList] INPUT PARAMS page={} limit={}',
    GET_POST_LIST_SUCCESS: '[UserService.getPostList] success status={} response={}',
    GET_POST_LIST_RESULT: '[UserService.getPostList] result {}',
    GET_POST_LIST_ERROR: '[UserService.getPostList] error status={} response={}',
    GET_POST_LIST_FAIL: '[UserService.getPostList] fail status={} response={}',

    GET_COMMENTS_BY_POST_INPUT_PARAMS: '[UserService.getCommentsByPost] INPUT PARAMS id={} page={} limit={}',
    GET_COMMENTS_BY_POST_SUCCESS: '[UserService.getCommentsByPost] success status={} response={}',
    GET_COMMENTS_BY_POST_RESULT: '[UserService.getCommentsByPost] result {}',
    GET_COMMENTS_BY_POST_ERROR: '[UserService.getCommentsByPost] error status={} response={}',
    GET_COMMENTS_BY_POST_FAIL: '[UserService.getCommentsByPost] fail status={} response={}',
  },
  userService: {
    GET_USER_BY_ID_SHORT_INPUT_PARAMS: '[UserService.getUserByIdShort] INPUT PARAMS id={}',
    GET_USER_BY_ID_SHORT_SUCCESS: '[UserService.getUserByIdShort] success status={} response={}',
    GET_USER_BY_ID_SHORT_RESULT: '[UserService.getUserByIdShort] result {}',
    GET_USER_BY_ID_SHORT_ERROR: '[UserService.getUserByIdShort] error status={} response={}',
    GET_USER_BY_ID_SHORT_FAIL: '[UserService.getUserByIdShort] fail status={} response={}',

    GET_USER_BY_ID_INPUT_PARAMS: '[UserService.getUserById] INPUT PARAMS id={}',
    GET_USER_BY_ID_SUCCESS: '[UserService.getUserById] success status={} response={}',
    GET_USER_BY_ID_RESULT: '[UserService.getUserById] result {}',
    GET_USER_BY_ID_ERROR: '[UserService.getUserById] error status={} response={}',
    GET_USER_BY_ID_FAIL: '[UserService.getUserById] fail status={} response={}',

    CREATE_USER_INPUT_PARAMS: '[UserService.createUser] INPUT PARAMS body={}',
    CREATE_USER_SUCCESS: '[UserService.createUser] success status={} response={}',
    CREATE_USER_RESULT: '[UserService.createUser] result={}',
    CREATE_USER_FAIL: '[UserService.createUser] fail status={} response={}',
    CREATE_USER_ERROR: '[UserService.createUser] error status={} response={}',

    UPDATE_USER_INPUT_PARAMS: '[UserService.updateUser] INPUT PARAMS id={} body={}',
    UPDATE_USER_SUCCESS: '[UserService.updateUser] success status={} response={}',
    UPDATE_USER_RESULT: '[UserService.updateUser] result={}',
    UPDATE_USER_FAIL: '[UserService.updateUser] fail status={} response={}',
    UPDATE_USER_ERROR: '[UserService.updateUser] error status={} response={}',

    GET_POST_BY_USER_INPUT_PARAMS: '[UserService.getPostByUser] INPUT PARAMS id={}',
    GET_POST_BY_USER_SUCCESS: '[UserService.getPostByUser] success status={} response={}',
    GET_POST_BY_USER_RESULT: '[UserService.getPostByUser] result {}',
    GET_POST_BY_USER_ERROR: '[UserService.getPostByUser] error status={} response={}',
    GET_POST_BY_USER_FAIL: '[UserService.getPostByUser] fail status={} response={}',

    GET_USER_LIST_INPUT_PARAMS: '[UserService.getUserList] INPUT PARAMS page={} limit={}',
    GET_USER_LIST_SUCCESS: '[UserService.getUserList] success status={} response={}',
    GET_USER_LIST_RESULT: '[UserService.getUserList] result {}',
    GET_USER_LIST_ERROR: '[UserService.getUserList] error status={} response={}',
    GET_USER_LIST_FAIL: '[UserService.getUserList] fail status={} response={}',
  },
  apiRepository: {
    GET_USER_BY_ID_THIRD_PARTY_INVOKE: '[ApiRepository.getUserByIdThirdParty] id={}',
    GET_USER_BY_ID_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.getUserByIdThirdParty] success {}',
    GET_USER_BY_ID_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.getUserByIdThirdParty] error {}',

    CREATE_USER_THIRD_PARTY_INVOKE: '[ApiRepository.createUserThirdParty] invoke api body={}',
    CREATE_USER_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.createUserThirdParty] success {}',
    CREATE_USER_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.createUserThirdParty] error {}',

    GET_POSTS_BY_USER_THIRD_PARTY_INVOKE: '[ApiRepository.getPostsByUserThirdParty] invoke api id={}',
    GET_POSTS_BY_USER_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.getPostsByUserThirdParty] success {}',
    GET_POSTS_BY_USER_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.getPostsByUserThirdParty] error {}',

    UPDATE_USER_THIRD_PARTY_INVOKE: '[ApiRepository.updateUserThirdParty] invoke api id={} body={}',
    UPDATE_USER_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.updateUserThirdParty] success {}',
    UPDATE_USER_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.updateUserThirdParty] error {}',

    GET_USER_LIST_THIRD_PARTY_INVOKE: '[ApiRepository.getUserListThirdParty] invoke api page={} limit={}',
    GET_USER_LIST_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.getUserListThirdParty] success {}',
    GET_USER_LIST_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.getUserListThirdParty] error {}',

    GET_POST_LIST_THIRD_PARTY_INVOKE: '[ApiRepository.getPostListThirdParty] invoke api page={} limit={}',
    GET_POST_LIST_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.getPostListThirdParty] success {}',
    GET_POST_LIST_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.getPostListThirdParty] error {}',

    GET_COMMENTS_BY_POST_THIRD_PARTY_INVOKE: '[ApiRepository.getCommentsByPostThirdParty] invoke api id={} page={} limit={}',
    GET_COMMENTS_BY_POST_THIRD_PARTY_REPLY_SUCCESS: '[ApiRepository.getCommentsByPostThirdParty] success {}',
    GET_COMMENTS_BY_POST_THIRD_PARTY_REPLY_ERROR: '[ApiRepository.getCommentsByPostThirdParty] error {}',
  },
}