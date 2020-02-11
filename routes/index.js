const router = require('express').Router();
router.use('/', require('../routes/articles'));
router.use('/', require('../routes/users'));

module.exports = router;
