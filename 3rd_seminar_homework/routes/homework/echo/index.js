const express = require('express');
const router = express.Router();

// GET /home/echo/:name/:age
router.get('/:name/:age', (req, res, next) => {
	const resObj = {
		name: req.params.name,
		age: req.params.age
	};
	res.status(200).send(resObj);
});

// POST /home/echo/
router.post('/', (req, res, next) => {
	const resObj = {
		name: req.body.name,
		age: req.body.age
	};
	res.status(200).send(resObj);
});

module.exports = router;
