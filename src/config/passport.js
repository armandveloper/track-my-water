const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				return done(null, false, {
					message: 'Usuario o contraseña incorrecta',
				});
			}
			if (!(await user.isValidPassword(password))) {
				return done(null, false, {
					message: 'Usuario o contraseña incorrecta',
				});
			}
			return done(null, user);
		} catch (err) {
			console.log(err);
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;
