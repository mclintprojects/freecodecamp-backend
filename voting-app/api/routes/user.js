const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

router.post(
	'/users',
	[
		check('email')
			.isEmail()
			.withMessage('Email must be a valid email address'),
		check('password')
			.isLength({ min: 8 })
			.withMessage('Password must be longer than 7 chars')
	],
	function(req, res, next) {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(422).send(errors.mapped());
		} else {
			saveUser(req.body, res);
		}
	}
);

router.post(
	'/users/auth',
	[
		check('email')
			.isEmail()
			.withMessage('Email must be a valid email address'),
		check('password')
			.isLength({ min: 8 })
			.withMessage('Password must be longer than 7 chars')
	],
	async function(req, res, next) {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, success) => {
				if (success) {
					let token = getToken(req.body.token, user._id);

					res.send({
						email: req.body.email,
						token,
            id: user._id
					});
				} else {
					next({status: 404, message: 'A user with that email or password does not exist'});
				}
			});
		} else {
			next({status: 404, message: 'A user with that email does not exist'});
		}
	}
);

async function saveUser(newUser, res) {
	let user = await User.findOne({ email: newUser.email });
	if (!user) {
		let userId = registerUser(newUser);
		let token = getToken(newUser.email, userId);

		res.status(201).send({ email: newUser.email, token: token, _id: user._id });
	} else {
		res.send({ error: 'A user with that email already exists' });
	}
}

function getToken(email, userId) {
	return jwt.sign({ email, userId }, config.jwt.secret, {
		expiresIn: '7 days'
	});
}

async function registerUser(user, callback) {
	let hash = await getPwdHash(user.password);
	user.password = hash;

	let newUser = User.create(user);
	return newUser._id;
}

function getPwdHash(password) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (!err) {
				bcrypt.hash(password, salt, (err, hash) => {
					if (!err) {
						resolve(hash);
					} else {
						reject('Password hashing failed.');
					}
				});
			}
		});
	});
}

module.exports = router;
