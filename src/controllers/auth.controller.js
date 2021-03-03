const path = require('path');
const passport = require('../config/passport');
const User = require('../models/User');

exports.renderLogin = (req, res) => {
	res.render('login', {
		title: 'Iniciar Sesión en Track My Water',
	});
};

exports.renderRegister = (req, res) => {
	res.render('register', {
		title: 'Regístrate en Track My Water',
	});
};

exports.login = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true,
});

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/login');
};

exports.register = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		let user = await User.findOne({ username });
		if (user) {
			req.flash('errorFeedback', [
				'Ya existe una cuenta asociada a ese usuario',
			]);
			return res.redirect('/registro');
		}
		user = new User(req.body);
		await user.hashPassword(password);
		await user.save();
		next();
	} catch (err) {
		console.log(err);
		res.flash('errorFeedback', [
			'Ocurrió un error inesperado, por favor intente más tarde',
		]);
		return res.redirect('/registro');
	}
};
