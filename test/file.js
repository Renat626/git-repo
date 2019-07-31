var i = 0, str = "";
setInterval(function() {
	str = str + " " + i; 
	$("#str").text(str);
	i++;
}, 10);