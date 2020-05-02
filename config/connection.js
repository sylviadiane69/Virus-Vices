const mysql = require("mysql");
let connection;
if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: "localhost",
		PORT: 3306,
		user: "root",
		password: "",
		database: "cards_db",
	});
}

connection.connect(function (err) {
	if (err) throw err;
	console.log(`connection id ${connection.threadId}`);
});
module.exports = connection;
