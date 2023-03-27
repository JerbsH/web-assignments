"use strict";
const catModel = require("../models/catModel");
const { validationResult } = require("express-validator");

const getCatList = async (req, res) => {
	try {
		let cats = await catModel.getAllCats();
		console.log(cats);
		cats = cats.map((cat) => {
			cat.birthdate = cat.birthdate.toISOString().split("T")[0];
			return cat;
		});
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
	if (!req.file) {
		res.status(400).json({
			status: 400,
			message: "Invalid or missing image file",
		});
		return;
	}
	const validationError = validationResult(req);
	if (!validationError.isEmpty()) {
		res.status(400).json({
			status: 400,
			errors: validationError.array(),
			message: "Invalid data",
		});
		return;
	}
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
		res.status(201).json({ message: "New cat added!" });
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({ error: 500, message: "SQL insert cat failed" });
	}
};

const putCat = async (req, res) => {
	const validationError = validationResult(req);
	if (!validationError.isEmpty()) {
		res.status(400).json({
			status: 400,
			errors: validationError.array(),
			message: "Invalid data",
		});
		return;
	}
	try {
		console.log("modifying a cat ", req.body);
		const cat = req.body;
		const result = await catModel.modifyCat(cat);
		// send correct response if modify succesful
		res.status(200).json({ message: "Cat modified!" });
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({ error: 500, message: "SQL update cat failed" });
	}
};

const deleteCat = async (req, res) => {
	try {
		const id = req.params.catId;
		console.log("deleting a cat ", id);
		const result = await catModel.deleteCat(id);
		// send correct response if delete succesful
		res.status(200).json({ message: "Cat deleted!" });
	} catch (e) {
		console.error("error", e.message);
		res.status(500).json({ error: 500, message: "SQL delete cat failed" });
	}
};

const catController = { getCatList, getCat, postCat, putCat, deleteCat };
module.exports = catController;
