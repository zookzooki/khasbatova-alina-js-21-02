const router = require('express').Router();
const UserService = require('../services/userService');

router.get('/signin/:id', UserService.getUserByIdShort);
router.post('/create', UserService.createUser);
router.get('/:id', UserService.getUserById);
router.get('/:id/post', UserService.getPostsByUser);
router.put('/:id', UserService.updateUser);
router.get('', UserService.getUserList);

module.exports = router;
