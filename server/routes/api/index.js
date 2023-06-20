const { Router } = require('express');
const router = Router();

router.use('/login', require('./login'));
router.use('/posts', require('./posts'));
router.use('/schedule', require('./schedule'));

module.exports = router;
