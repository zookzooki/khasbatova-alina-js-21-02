const router = require('express').Router();
const PostService = require('../services/postService');

router.get('', PostService.getPostList);
router.get('/:id/comment', PostService.getCommentsByPost);

module.exports = router;
