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
	// add cat details to cats array
	const newCat = req.body;
	newCat.filename = "http://localhost:3000/" + req.file.path;
	cats.push(newCat);
	// send correct response if upload succesful
	res.status(201).send("New cat added!");
};

const putCat = (req, res) => {
	res.send("With this endpoint you can modify cats.");
};

const delCat = (req, res) => {
	res.send("With this endpoint you can delete a cat.");
};

const catController = { getCatList, getCat, postCat, putCat, delCat };
module.exports = catController;
