const mysql = require('mysql');
const dbConfig = {
	host: "localhost",
	port: 3306,
	user: "root",
	password: "1234",
	database: "sopttest",
	connectionLimit: 20
};

module.exports = mysql.createPool(dbConfig);