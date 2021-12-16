const router = require('express').Router();
const TextService = require('../services/textService');

router.get('', TextService.getText);
router.post('', TextService.saveText);

module.exports = router;
