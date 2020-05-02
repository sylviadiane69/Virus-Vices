const path = require("path");
const http = require("http");
const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const mysql = require("mysql");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require("./utils/users");

const db = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "card_game",
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Mysql connected...");
});

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

const chatHost = "Chat Host";

//Run when user connects
io.on("connection", (socket) => {
	socket.on("joinRoom", ({username, room}) => {
		const user = userJoin(socket.id, username, room);
		socket.join(user.room);
		console.log(user);
		let sql = "INSERT INTO card_players2 SET ?";
		let query = db.query(sql, user, (err, user) => {
			console.log(user);
			// res.send("Card added....");
			// res.json({id: user.insertId});
		});

		//Welcome user
		//socket.emit emits to individual
		socket.emit("message", formatMessage(chatHost, "welcome to chat"));

		//Broadcast when a user connects
		//Broadcast emits to everyone but the user
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				formatMessage(chatHost, `${user.username} has joined the chat`)
			);
		//Send users and room info
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	//Listen for chat message     msg is a parameter for function
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(socket.id);
		//emit to everyone
		io.to(user.room).emit("message", formatMessage(user.username, msg));
	});

	//Runs when user disconnects
	socket.on("disconnect", () => {
		const user = userLeave(socket.id);
		if (user) {
			io.emit(
				"message",
				formatMessage(chatHost, `${user.username} has left the chat`)
			);
		}
	});
});

var routes = require("./controllers/vv_controller");

app.use(routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
