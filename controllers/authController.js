'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
require("dotenv").config();

const login = (req, res) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			console.log(err);
			return res.status(401).json({
				message: 'Incorrect username or password',
				// or more detailed message: info.message
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				res.json({ message: err });
			}
			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign(user, process.env.JWT_SECRET);
			// TODO: do you really need to include whole user to token payload? user.email??
			// NOTE: at least password should be removed
			return res.json({ user, token });
		});
	})(req, res);
};

module.exports = {
	login,
};
