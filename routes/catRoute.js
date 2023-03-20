"use strict";

const express = require("express");
const { delCat } = require("../controllers/catController");
const router = express.Router();
const catController = require("../controllers/catController");

router.get("/", catController.getCatList);

router.get("/:catId", catController.getCat);

router.post("/", catController.postCat);

router.put("/", catController.putCat);

router.delete("/", delCat);

module.exports = router;
