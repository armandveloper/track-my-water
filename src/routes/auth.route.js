const { Router } = require('express');
const authCtrl = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/is-authenticated');
const {
	validateRegister,
	validateLogin,
} = require('../validation/validations');

const router = Router();

router.get('/login', authCtrl.renderLogin);
router.get('/registro', authCtrl.renderRegister);
router.post('/login', validateLogin, authCtrl.login);
router.post('/register', [validateRegister, authCtrl.register], authCtrl.login);
router.get('/logout', [isAuthenticated], authCtrl.logout);

module.exports = router;
