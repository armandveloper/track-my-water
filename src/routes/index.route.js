const path = require('path');
const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/is-authenticated');

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

router.use(require('./auth.route'));

module.exports = router;
