"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
	try {
		const sql = `SELECT user_id, name, email, role FROM wop_user`;
		const [rows] = await promisePool.query(sql);
		return rows
	} catch (e) {
		console.error("error", e.message);
		throw new Error("SQL query failed");
	}
};

const getUserById = async (id) => {
	try {
		const sql = `SELECT user_id, name, email, role FROM wop_user WHERE user_id=?`;
		const [rows] = await promisePool.query(sql, [id]);
		return rows;
	} catch (e) {
		console.error("error", e.message);
		throw new Error("SQL query failed");
	}
};

module.exports = {
	getAllUsers,
	getUserById,
};
