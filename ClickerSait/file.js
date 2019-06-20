var woodtime = false, stonetime = false, woodspeed = 2000, stonespeed = 4000, woodcount = 1, stonecount = 1, wood = 0, stone = 0;
var woodspeedcost = 5, woodcountcost = 10, stonecost = 2, stonespeedcost = 5, stonecountcost = 10;

function stats() {
	$('#woodscore').text("Дерево["+wood+"]"); $('#stonescore').text("Камень["+stone+"]");
	if (wood >= woodspeedcost && woodspeed != 0) {$('#woodspeed').css("background-color", "peru")} else {$('#woodspeed').css("background-color", "burlywood")}
	if (stone >= woodcountcost) {$('#woodcount').css("background-color", "peru")} else {$('#woodcount').css("background-color", "burlywood")}
	if (wood >= stonecost && stonetime == false) {$('#stoneb').css("background-color", "gray")} else {$('#stoneb').css("background-color", "lightgray")}
	if (wood >= stonespeedcost && stonespeed != 0) {$('#stonespeed').css("background-color", "gray")} else {$('#stonespeed').css("background-color", "lightgray")}
	if (stone >= stonecountcost) {$('#stonecount').css("background-color", "gray")} else {$('#stonecount').css("background-color", "lightgray")}
	if (woodspeed == 0) {$('#woodspeed').text("Максимальная скорость")}
	if (stonespeed == 0) {$('#stonespeed').text("Максимальная скорость")}
}

function clickwood() {
	if (woodtime == false) {
		woodtime = true;
		$('#woodb').css("background-color", "burlywood");
		$('#wood').animate({width: $('#woodbg').width()}, woodspeed, function() {
			$('#wood').animate({width: 0}, 0);
			wood = wood + woodcount;
			$('#woodb').css("background-color", "peru");
			woodtime = false;
			stats();
		});
	}
}

function clickwoodspeed() {
	if (wood >= woodspeedcost && woodspeed != 0) {
		wood = wood - woodspeedcost;
		woodspeed = woodspeed - 100;
		woodspeedcost = parseInt(woodspeedcost + woodspeedcost / 2);
		$('#woodspeed').text("+ к скорости [ "+woodspeedcost+" дерева ]");
		stats();
	}
}

function clickwoodcount() {
	if (stone >= woodcountcost) {
		stone = stone - woodcountcost;
		woodcount = woodcount + 1;
		woodcountcost = parseInt(woodcountcost + woodcountcost / 2);
		$('#woodcount').text("+ к кол-ву [ "+woodcountcost+" камня ]");
		stats();
	}
}

function clickstone() {
	if (stonetime == false && wood >= stonecost) {
		stonetime = true;
		wood = wood - stonecost;
		stats();
		$('#stoneb').css("background-color", "lightgray");
		$('#stone').animate({width: $('#stonebg').width()}, stonespeed, function() {
			$('#stone').animate({width: 0}, 0);
			stone = stone + stonecount;
			stonetime = false;
			stats();
		});
	}
}

function clickstonespeed() {
	if (wood >= stonespeedcost && stonespeed != 0) {
		wood = wood - stonespeedcost;
		stonespeed = stonespeed - 100;
		stonespeedcost = parseInt(stonespeedcost + stonespeedcost / 2);
		$('#stonespeed').text("+ к скорости [ "+stonespeedcost+" дерева ]");
		stats();
	}
}

function clickstonecount() {
	if (stone >= stonecountcost) {
		stone = stone - stonecountcost;
		stonecount = stonecount + 1;
		stonecost = stonecost + 2;
		stonecountcost = parseInt(stonecountcost + stonecountcost / 2);
		$('#stonecount').text("+ к кол-ву [ "+stonecountcost+" камня ]");
		$('#stoneb').text("Произвести [ "+stonecost+" дерева ]");
		stats();
	}
}