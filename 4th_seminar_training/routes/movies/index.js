const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbConfig = {
	host: "localhost",
	port: 3306,
	user: "root",
	password: "1234",
	database: "sopttest"
};

/* GET /movies */
router.get('/', (req, res, next) => {
	const resObj = {
		msg: null,
		data: null
	};
	const conn = mysql.createConnection(dbConfig);
	let selectAllQuery = "select * from movies";
	conn.query(selectAllQuery, (err, result) => {
		if (err) {
			console.log(err);
			resObj.msg = "error";
			res.status(500).send(resObj);
			conn.end();
		} else {
			resObj.msg = "success";
			resObj.data = result;
			res.status(200).send(resObj);
			conn.end();
		}
	});
});

router.get('/:category', (req, res, next) => {
	const resObj = {
		msg: null,
		data: null
	};
	const conn = mysql.createConnection(dbConfig);
	let stmt = "select movie_attendance from movies where movie_category = ?";
	conn.query(stmt, req.params.category, (err, result) => {
		if (err) {
			console.log(err);
			resObj.msg = "error";
			res.status(500).send(resObj);
			conn.end();
		} else {
			let sum = 0;
			for (let i = 0; i < result.length; i++) {
				sum += result[i].movie_attendance;
			}
			resObj.msg = "success";
			resObj.data = sum;
			res.status(200).send(resObj);
			conn.end();
		}
	});
});

module.exports = router;
