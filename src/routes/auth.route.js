const { Router } = require('express');
const authCtrl = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/is-authenticated');

const router = Router();

router.get('/login', authCtrl.renderLogin);
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/logout', isAuthenticated, authCtrl.logout);

module.exports = router;
