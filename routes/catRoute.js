"use strict";

const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");
const multer = require('multer');
const upload = multer({dest: "uploads/"});

router
	.route("/")
	.get(catController.getCatList)
	.post(upload.single("cat") , catController.postCat)
	.put(catController.putCat);

router
	.route("/:catId")
	.get(catController.getCat)
	.delete(catController.deleteCat);

module.exports = router;
