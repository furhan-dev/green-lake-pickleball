const { Router } = require('express');
const router = Router();

router.use('/login', require('./login'));
router.use('/posts', require('./posts'));
// router.use('/orders', require('./orders'));

module.exports = router;
