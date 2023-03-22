"use strict";

const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");
const multer = require('multer');
const upload = multer({dest: "uploads/"});

router.get("/", catController.getCatList);
router.get("/:catId", catController.getCat);
router.post("/",upload.single("cat") , catController.postCat);
router.put("/", catController.putCat);
router.delete("/:catId", catController.delCat);

module.exports = router;
