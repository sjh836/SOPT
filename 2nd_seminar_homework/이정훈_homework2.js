const fs = require('fs');
const http = require('http');
const request = require('request');
const json2csv = require('json2csv');
const crypto = require('crypto');
const port = 3000;

const requestConfig = {
	url: "http://52.78.124.103:3456/homework/2nd",
	method: "POST",
	form: {
		name: "이정훈",
		phone: "010-xxxx-xxxx"
	}
};
const csvData = {
	name: null,
	university: null,
	major: null,
	email: null,
	hashedPhone: null
};
const resObj = {
	msg: null,
	data: null
};
const csvColumns = ["name", "university", "major", "email", "hashedPhone"];

const server = http.createServer((serverReq, serverRes) => {
	serverRes.setHeader('Content-Type', 'application/json; charset=utf-8');

	if(serverReq.url === "/info") { // /info 로 요청 시
		request(requestConfig, (err, requestRes, body) => {
			if (err) {
				console.log(err);
				serverRes.statusCode = 500;
				resObj.msg = "error";
				resObj.data = null;
				serverRes.end(JSON.stringify(resObj));
			} else {
				const result = JSON.parse(body); //받은 response JSON object 를 파싱

				if (result.status === "fail") {
					serverRes.statusCode = 400;
					resObj.msg = "fail";
					resObj.data = null;
					serverRes.end(JSON.stringify(resObj));
				} else {
					crypto.randomBytes(32, (err, buffer) => {
						if (err) {
							console.log(err);
							serverRes.statusCode = 500;
							resObj.msg = "error";
							resObj.data = null;
							serverRes.end(JSON.stringify(resObj));
						} else {
							crypto.pbkdf2(result.data.phone, buffer.toString('base64'), 100000, 64, 'sha512', (err, hashed) => { // 해싱
								if (err) {
									console.log(err);
									serverRes.statusCode = 500;
									resObj.msg = "error";
									resObj.data = null;
									serverRes.end(JSON.stringify(resObj));
								} else {
									csvData.name = result.data.name;
									csvData.university = result.data.university;
									csvData.major = result.data.major;
									csvData.email = result.data.email;
									csvData.hashedPhone = hashed.toString('base64');

									const csvObj = json2csv({
										fields: csvColumns,
										data: csvData
									});

									fs.writeFile('./ljh_info.csv', csvObj, (err) => { // CSV 파일 저장
										if (err) {
											console.log(err);
											resObj.msg = "error";
											resObj.data = null;
											serverRes.end(JSON.stringify(resObj));
										} else {
											console.log("csv 파일 저장 성공");
											resObj.msg = "success";
											resObj.data = csvData;

											serverRes.statusCode = 200;
											serverRes.end(JSON.stringify(resObj)); // 최종응답
										}
									});
								}
							});
						}
					});
				}
			}
		});
	} else {
		serverRes.statusCode = 404;
		resObj.msg = "error";
		resObj.data = null;
		serverRes.end(JSON.stringify(resObj));
	}
}).listen(port, function () {
	console.log(`포트 ${port}에서 서버 동작중`);
});