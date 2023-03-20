"use strict";
const catModel = require("../models/catModel");

const cats = catModel.cats;

const getCatList = (req, res) => {
	res.json(cats);
};

const getCat = (req, res) => {
	const id = req.params.catId;
	if (cats.length >= id) {
		const cat = cats[id - 1];
		res.json(cat);
	} else {
		res.status(404).send("no cat found");
	}
};

const postCat = (req, res) => {
	console.log("posting a cat ", req.body, req.file);
	res.send("With this endpoint you can add cats.");
};

const putCat = (req, res) => {
	res.send("With this endpoint you can modify cats.");
};

const delCat = (req, res) => {
	res.send("With this endpoint you can delete a cat.");
};

const catController = { getCatList, getCat, postCat, putCat, delCat };
module.exports = catController;
