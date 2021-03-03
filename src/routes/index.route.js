const path = require('path');
const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/is-authenticated');
const {
	renderHome,
	renderRecords,
} = require('../controllers/waterTank.controller');

const router = Router();

router.get('/', isAuthenticated, renderHome);
router.get('/registros', isAuthenticated, renderRecords);
router.use(require('./auth.route'));

module.exports = router;
