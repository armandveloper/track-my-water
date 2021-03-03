const path = require('path');
const passport = require('../config/passport');
const User = require('../models/User');

exports.renderLogin = (req, res) => {
	res.render('login', {
		title: 'Iniciar Sesión en Track My Water',
		ogTitle: 'Iniciar sesión en Track My Water',
		ogDescription:
			'Para comenzar a monitorear el agua de sus contenedores inicie sesión',
		ogUrl: `${res.locals.url}/login`,
		ogImage: `${res.locals.url}/img/login-preview.png`,
	});
};

exports.renderRegister = (req, res) => {
	res.render('register', {
		title: 'Regístrate en Track My Water',
		ogTitle: 'Regístrate en Track My Water',
		ogDescription:
			'Crea tu usuario y comienza a monitorear el agua de tus contenedores',
		ogUrl: `${res.locals.url}/registro`,
		ogImage: `${res.locals.url}/img/register-preview.png`,
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
