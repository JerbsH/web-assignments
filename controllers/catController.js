"use strict";
const catModel = require("../models/catModel");

const getCatList = async (req, res) => {
	try {
		const cats = await catModel.getAllCats();
		console.log(cats);
		res.json(cats);
	} catch (error) {
		res.status(500).json({ error: 500, message: "SQL query failed" });
	}
};

const getCat = async (req, res) => {
	try {
		const catId = Number(req.params.catId);
		if (!Number.isInteger(catId)) {
			res.status(400).json({ error: 400, message: "Invalid id" });
			return;
		}
		const [cat] = await catModel.getCatById(catId);
		console.log("getCat", cat);
		if (cat) {
			res.json(cat);
		} else {
			res.status(404).json({ message: "cat not found" });
		}
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({ error: 500, message: "SQL query failed" });
	}
};

const postCat = async (req, res) => {
	try {
		console.log("posting a cat ", req.body, req.file);
		const ownerId = Number(req.body.owner);
		console.log("postCat, ownerId: " + ownerId);
		if (!Number.isInteger(ownerId)) {
			res.status(400).json({ error: 400, message: "Invalid id" });
			return;
		}
		// add cat details to cats array
		const newCat = req.body;
		newCat.filename = req.file.filename;
		const result = await catModel.insertCat(newCat);
		// send correct response if upload succesful
		res.status(201).send("New cat added!");
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({ error: 500, message: "SQL insert cat failed" });
	}
};

const putCat = async (req, res) => {
	console.log("modifying a cat ", req.body);
	// TODO: add try-catch
	const cat = req.body;
	const result = await catModel.modifyCat(cat);
	// send correct response if modify succesful
	res.status(200).send("Cat modified!");
};

const delCat = async (req, res) => {
	const id = req.params.catId;
	console.log("deleting a cat ", id);
	// TODO: add try-catch
	const result = await catModel.deleteCat(id);
	// send correct response if delete succesful
	res.status(200).send("Cat deleted!");
};

const catController = { getCatList, getCat, postCat, putCat, delCat };
module.exports = catController;
