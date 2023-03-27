"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router
	.route("/")
	.get(
		body("name").isAlphanumeric().isLength({ min: 1, max: 100 }).escape().trim(),
		body("email").isEmail(),
		body("password").isLength({ min: 8 }),
		userController.getUserList)
	.post(
		body("name").isAlphanumeric().isLength({ min: 1, max: 100 }).escape().trim(),
		body("email").isEmail(),
		body("password").isLength({ min: 8 }),
		userController.postUser)
	.put(userController.putUser);

router
	.route("/:userId")
	.get(userController.getUser)
	.delete(userController.deleteUser);

module.exports = router;
