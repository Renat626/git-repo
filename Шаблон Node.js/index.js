let express = require('express');
let app = express();
let server = require('http').createServer(app);
let fs = require('fs');
let io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + '/'));

users = [];

io.sockets.on("connection", function(socket) {

	socket.on("join", function(data) {
		socket.join(data.name); users.push(data.name); socket.username = data.name; console.log("Подключён пользователь - " + data.name);
		io.sockets.emit("set userlist", users);
		io.sockets.in(data.name).emit('start');
	});

	socket.on("disconnect", function(data) {
		console.log("Отключён пользователь - " + socket.username);
		for (var i = users.length - 1; i >= 0; i--) {if (users[i] == socket.username) {users.splice(i, 1); i=-1}}
		io.sockets.emit("set userlist", users);
	});
});