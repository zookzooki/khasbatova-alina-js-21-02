const router = require('express').Router();
const textRouter = require('./textRouter');

router.use('/text', textRouter);

module.exports = router;
