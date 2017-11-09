const http = require('http');
const crypto = require('crypto');
const url = require('url');
const querystring = require('querystring');
const port = 3000;

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	const responseObj = {
		msg: "",
		str: null,
		hashed: null
	};
	const urlParsed = url.parse(req.url); //서버에 들어오는 url을 파싱
	const queryParsed = querystring.parse(urlParsed.query); //query로 만들고 이를 JSON 객체로 만듬

	if (queryParsed.str === undefined) {
		res.statusCode = 500;
		responseObj.msg = "포맷 오류";
		res.end(JSON.stringify(responseObj));
		return;
	}
	console.log(`요청내용 : ${queryParsed.str}`); //query의 프로퍼티 키값은 str

	let hashAlgorithm = crypto.createHash('sha512');
	let hashing = hashAlgorithm.update(queryParsed.str);
	let hashedString = hashing.digest('base64');

	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			res.statusCode = 500;
			responseObj.msg = "실패";
			res.end(JSON.stringify(responseObj));
		} else {
			crypto.pbkdf2(queryParsed.str, buffer.toString('base64'), 100000, 64, 'sha512', (err, hashedStr) => {
				if (err) {
					console.log(err);
					res.statusCode = 500;
					responseObj.msg = "실패";
					res.end(JSON.stringify(responseObj));
				} else {
					res.statusCode = 200;
					responseObj.msg = "성공";
					responseObj.str = queryParsed.str;
					responseObj.hashed = hashedStr.toString('base64');
					res.end(JSON.stringify(responseObj));
				}
			});
		}
	});
}).listen(port, () => {
	console.log(`포트 ${port}에서 서버 동작중`);
});