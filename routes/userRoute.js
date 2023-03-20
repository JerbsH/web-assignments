'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/", userController.getUserList);

//TODO: add user/:id & other endpoints needed

router.get("/:userId", userController.getUser);
router.post("/", userController.postUser);
router.put("/", userController.putUser);
router.delete("/", userController.delUser);

module.exports = router;
