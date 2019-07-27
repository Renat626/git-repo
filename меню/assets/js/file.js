var nav = false;
function menu() {
	if (nav == false) {
		nav = true;
		$("#nav").css("display", "block");
		$("ul").css("display", "block");
	}
	else {
		nav = false;
		$("#nav").css("display", "");
		$("ul").css("display", "flex");
	}
}