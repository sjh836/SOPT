const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'uploads/'); // 저장 경로
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname); // 기존 파일명, 확장자 사용
	}
});
const uploader = multer({ storage: storage });
const dbConfig = {
	host: "localhost",
	port: 3306,
	user: "root",
	password: "1234",
	database: "sopt"
};

/* POST /upload */
router.post('/', uploader.single('imageFile'), (req, res, next) => { // key로 imageFile의 value를 받음
	const resObj = {
		msg: null,
		path: null
	};
	const conn = mysql.createConnection(dbConfig);
	const insertImg = "insert into image6 (image_path) values (?)";
	conn.query(insertImg, req.file.path, (err) => {
		if (err) {
			console.log(err);
			resObj.msg = "error";
			res.status(500).send(resObj);
			conn.end();
		} else {
			resObj.msg = "success";
			resObj.path = req.file.path;
			res.status(200).send(resObj);
			conn.end();
		}
	});
});

module.exports = router;
