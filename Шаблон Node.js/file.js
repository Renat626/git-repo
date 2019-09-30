let socket = "", name = "";
function init() {
	socket = io.connect();
	name = setName.value; startDiv.remove(); hub.style.visibility = "visible";
 	socket.emit("join", {name: name});

	socket.on("set userlist", function(data) {userlist.textContent = data});

	socket.on("start", function() {hub.remove(); inGame = true; game.style.visibility = "visible"; start()});
}

function start() {
	
}

onkeydown = function(e) {
	
}