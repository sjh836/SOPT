const express = require('express');
const dbcp = require('../../config/dbPool');
const router = express.Router();

/* GET /classify/:attendance */
router.get('/:attendance', (req, res, next) => {
	const resObj = {
		msg: null,
		data: null
	};
	dbcp.getConnection((err, connection) => {
		if (err) {
			console.log(err);
			resObj.msg = "error";
			res.status(500).send(resObj);
		} else {
			const stmt = "select * from movies where movie_attendance > ?";
			connection.query(stmt, req.params.attendance, (err, result) => {
				if (err) {
					console.log(err);
					resObj.msg = "error";
					res.status(500).send(resObj);
				} else {
					resObj.msg = "success";
					resObj.data = result;
					res.status(200).send(resObj);
					connection.release();
				}
			});
		}
	});
});

module.exports = router;
