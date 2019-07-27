var nav = false;
function menu() {
	if (nav == false) {
		nav = true;
		$("#nav").css("display", "block");
		$("ul").css("display", "block");
	}
	else {
		nav = false;
		$("#nav").css("display", "none");
		$("ul").css("display", "flex");
	}
}
setInterval(function() {
	if ($(window).width() > 900) {
		if (nav == true) {nav = false}
		if ($("#nav").css("display") != "") {$("#nav").css("display", "")}
		if ($("ul").css("display") != "flex") {$("ul").css("display", "flex")}
	}
}, 10);