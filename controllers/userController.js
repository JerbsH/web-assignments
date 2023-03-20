"use strict";
const userModel = require("../models/userModel");

const users = userModel.users;

const getUserList = (req, res) => {
	for (const user of users) {
		delete user.password;
	};
	res.json(users);
};

const getUser = (req, res) => {
	const id = req.params.userId;
	if (users.length >= id) {
		const user = users[id - 1];
		delete user.password;
		res.json(user);
	} else {
		res.status(404).send("no user found");
	}
};

const postUser = (req, res) => {
	console.log(req.body);
	const newUser = 
	{
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};
	users.push(newUser);
	res.status(201).send("Added user " + req.body.name)
};

const putUser = (req, res) => {
	res.send("With this endpoint you can modify users.");
};

const delUser = (req, res) => {
	res.send("With this endpoint you can delete a user.");
};

const userController = { getUserList, getUser, postUser, putUser, delUser };
module.exports = userController;
