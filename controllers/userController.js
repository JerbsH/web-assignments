"use strict";
const userModel = require("../models/userModel");

const getUserList = async (req, res) => {
	try {
		const users = await userModel.getAllUsers();
		console.log(users);
		res.json(users);
	} catch (e) {
		res.status(500).json({ error: 500, message: "SQL query failed" });
	}
};

const getUser = async (req, res) => {
	try {
		const userId = Number(req.params.userId);
		if (!Number.isInteger(userId)) {
			res.status(400).json({ error: 400, message: "Invalid id" });
			return;
		}
		const [user] = await userModel.getUserById(userId);
		if (user) {
			res.json(user);
		} else {
			res.status(404).send("no user found");
		}
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({ error: 500, message: "SQL query failed" });
	}
};

const postUser = async (req, res) => {
	try {
		console.log("Posting a user ", req.body);
		const newUser = req.body;
		const result = await userModel.postUser(newUser);
		res.status(201).json({message: "New user added"});
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({error: 500, message: "SQL insert user failed"});
	}
};

const putUser = (req, res) => {
	res.send("With this endpoint you can modify users.");
};

const deleteUser = (req, res) => {
	res.send("With this endpoint you can delete a user.");
};

const userController = { getUserList, getUser, postUser, putUser, deleteUser };
module.exports = userController;
