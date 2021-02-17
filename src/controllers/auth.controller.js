const path = require('path');
const passport = require('../config/passport');
const User = require('../models/User');

exports.renderLogin = (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
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

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;
		let user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'Ya hay una cuenta asociada con ese username',
			});
		}
		user = new User(req.body);
		await user.hashPassword(password);
		await user.save();
		return res.status(201).json({
			ok: true,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Error al crear el usuario',
		});
	}
};
