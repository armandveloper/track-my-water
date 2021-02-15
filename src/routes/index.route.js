const { Router } = require('express');

const router = Router();

router.use('/waterTank', require('./waterTank.route'));

module.exports = router;
