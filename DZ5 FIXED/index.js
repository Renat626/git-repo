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

basket = [];

io.sockets.on("connection", function(socket) {

	socket.on("basketUpdate", function(data) {
		console.log("*********************************");
		console.log(data);
		basket = data;
	});

	socket.on("getBasket", function() {
		io.sockets.emit("setBasket", basket);
	});

	socket.on("disconnect", function(data) {
		basket = [];
	});
});