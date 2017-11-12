const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const json2csv = require('json2csv');
const Converter = require('csvtojson').Converter;
const router = express.Router();

const csvColumns = ["name", "hashedPwd", "salt", "age"];
const fileName = "./userDB.csv";

/* POST /homework/signupdemo */
router.post('/signupdemo', (req, res, next) => {
	const resObj = {
		msg: null,
		data: {
			name: req.body.name,
			hashedPwd: null,
			salt: null,
			age: req.body.age
		}
	};
	let csvData = [];
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			resObj.msg = "error";
			res.status(500).send(resObj);
		} else {
			crypto.pbkdf2(req.body.pwd, buffer.toString('base64'), 100000, 64, 'sha512', (err, hashed) => { // 해싱
				if (err) {
					console.log(err);
					resObj.msg = "error";
					res.status(500).send(resObj);
				} else {
					resObj.data.hashedPwd = hashed.toString('base64');
					resObj.data.salt = buffer.toString('base64');

					fs.access(fileName, (err) => { // userDB.csv 존재유무 체크
						if (err) {
							if (err.code === "ENOENT") { // userDB.csv 이 없을 경우 생성
								csvData.push(resObj.data);

								const csvObj = json2csv({
									fields: csvColumns,
									data: csvData
								});

								fs.writeFile(fileName, csvObj, (err) => { // CSV 파일 저장
									if (err) {
										console.log(err);
										resObj.msg = "error";
										res.status(500).send(resObj);
									} else {
										console.log("csv 생성 완료");
										resObj.msg = "success";
										res.status(200).send(resObj);
									}
								});
							} else {
								console.log(err);
								resObj.msg = "error";
								res.status(500).send(resObj);
							}
						} else { // userDB.csv 이 있을 경우 갱신
							const converter = new Converter({});
							converter.fromFile(fileName, (err, result) => {
								if (err) {
									console.log(err);
									resObj.msg = "error";
									res.status(500).send(resObj);
								} else {
									csvData = result;
									csvData.push(resObj.data);

									const csvObj = json2csv({
										fields: csvColumns,
										data: csvData
									});

									fs.writeFile(fileName, csvObj, (err) => {
										if (err) {
											console.log(err);
											resObj.msg = "error";
											res.status(500).send(resObj);
										} else {
											console.log("csv 갱신 완료");
											resObj.msg = "success";
											res.status(200).send(resObj);
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
