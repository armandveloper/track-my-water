const validateUsernameAndPassword = (req, res, next, redirectPath) => {
	const errors = [];
	const { username, password } = req.body;

	if (username.trim() === '') {
		errors.push('El nombre de usuario es obligatorio');
	}
	if (password.trim() === '') {
		errors.push('La contraseña es obligatoria');
	}

	if (errors.length > 0) {
		req.flash('errorFeedback', errors);
		return res.redirect(redirectPath);
	}

	next();
};

exports.validateRegister = (req, res, next) => {
	validateUsernameAndPassword(req, res, next, '/registro');
};

exports.validateLogin = (req, res, next) => {
	validateUsernameAndPassword(req, res, next, '/login');
};
