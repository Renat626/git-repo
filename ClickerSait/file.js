var woodtime = false, stonetime = false, irontime = false, woodspeed = 2000, stonespeed = 4000, ironspeed = 6000, woodcount = 1, stonecount = 1, ironcount = 1, wood = 0, stone = 0, iron = 0;
var woodspeedcost = 5, woodcountcost = 10, stonecost = 2, stonespeedcost = 5, stonecountcost = 10, ironcost = 5, ironspeedcost = 5, ironcountcost = 10;
var woodauto = false, stoneauto = false, ironauto = false, woodturn = false, stoneturn = false, ironturn = false;

function stats() {
	$('#woodscore').text("Дерево["+wood+"]"); $('#stonescore').text("Камень["+stone+"]"); $('#ironscore').text("Металл["+iron+"]");
	if (wood >= woodspeedcost && woodspeed != 0) {$('#woodspeed').css("background-color", "peru")} else {$('#woodspeed').css("background-color", "burlywood")}
	if (stone >= woodcountcost) {$('#woodcount').css("background-color", "peru")} else {$('#woodcount').css("background-color", "burlywood")}
	if (wood >= stonecost && stonetime == false) {$('#stoneb').css("background-color", "gray")} else if (stoneauto == false) {$('#stoneb').css("background-color", "lightgray")}
	if (wood >= stonespeedcost && stonespeed != 0) {$('#stonespeed').css("background-color", "gray")} else {$('#stonespeed').css("background-color", "lightgray")}
	if (stone >= stonecountcost) {$('#stonecount').css("background-color", "gray")} else {$('#stonecount').css("background-color", "lightgray")}
	if (stone >= ironcost && irontime == false) {$('#ironb').css("background-color", "lightseagreen")} else if (ironauto == false) {$('#ironb').css("background-color", "turquoise")}
	if (wood >= ironspeedcost && ironspeed != 0) {$('#ironspeed').css("background-color", "lightseagreen")} else {$('#ironspeed').css("background-color", "turquoise")}
	if (stone >= ironcountcost) {$('#ironcount').css("background-color", "lightseagreen")} else {$('#ironcount').css("background-color", "turquoise")}
	if (iron >= 20 && woodauto == false) {$('#woodauto').css("background-color", "peru")} else {$('#woodauto').css("background-color", "burlywood")}
	if (iron >= 50 && stoneauto == false) {$('#stoneauto').css("background-color", "gray")} else {$('#stoneauto').css("background-color", "lightgray")}
	if (iron >= 80 && ironauto == false) {$('#ironauto').css("background-color", "lightseagreen")} else {$('#ironauto').css("background-color", "turquoise")}
	if (woodspeed == 0) {$('#woodspeed').text("Максимальная скорость")}
	if (stonespeed == 0) {$('#stonespeed').text("Максимальная скорость")}
	if (ironspeed == 0) {$('#ironspeed').text("Максимальная скорость")}
}

setInterval(function(){
	if (woodtime == false && woodauto == true && woodturn == true) {clickwood()}
	if (stonetime == false && stoneauto == true && stoneturn == true) {clickstone()}
	if (irontime == false && ironauto == true && ironturn == true) {clickiron()}
}, 10);

function clickwood(pl) {
	if (pl == true && woodauto == true && woodturn == false) {woodturn = true; $('#woodb').text("Выключить бота")}
	else if (pl == true && woodauto == true && woodturn == true) {woodturn = false; $('#woodb').text("Включить бота")}
	if (woodtime == false) {
		woodtime = true;
		if (woodauto == false) {$('#woodb').css("background-color", "burlywood")}
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
		woodspeedcost = parseInt(woodspeedcost + woodspeedcost / 2.5);
		$('#woodspeed').text("+ к скорости [ "+woodspeedcost+" дерева ]");
		stats();
	}
}
function clickwoodcount() {
	if (stone >= woodcountcost) {
		stone = stone - woodcountcost;
		woodcount = woodcount + 1;
		woodcountcost = parseInt(woodcountcost + woodcountcost / 2.5);
		$('#woodcount').text("+ к кол-ву [ "+woodcountcost+" камня ]");
		stats();
	}
}
function clickwoodauto(){
	if (iron >= 20) {
		iron = iron - 20;
		woodauto = true;
		$('#woodb').text("Включить бота");
		$('#woodauto').text("Автоматизированно");
		stats();
	}
}



function clickstone(pl) {
	if (pl == true && stoneauto == true && stoneturn == false) {stoneturn = true; $('#stoneb').text("Выключить бота [ "+stonecost+" дерева ]")}
	else if(pl == true && stoneauto == true && stoneturn == true) {stoneturn = false; $('#stoneb').text("Включить бота [ "+stonecost+" дерева ]")}
	if (stonetime == false && wood >= stonecost) {
		stonetime = true;
		wood = wood - stonecost;
		stats();
		if (stoneauto == false) {$('#stoneb').css("background-color", "lightgray")}
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
		stonespeedcost = parseInt(stonespeedcost + stonespeedcost / 2.5);
		$('#stonespeed').text("+ к скорости [ "+stonespeedcost+" дерева ]");
		stats();
	}
}
function clickstonecount() {
	if (stone >= stonecountcost) {
		stone = stone - stonecountcost;
		stonecount = stonecount + 1;
		stonecost = stonecost + 2;
		stonecountcost = parseInt(stonecountcost + stonecountcost / 2.5);
		$('#stonecount').text("+ к кол-ву [ "+stonecountcost+" камня ]");
		if (stoneauto == false) {$('#stoneb').text("Произвести [ "+stonecost+" дерева ]")}
		stats();
	}
}
function clickstoneauto(){
	if (iron >= 50) {
		iron = iron - 50;
		stoneauto = true;
		$('#stoneb').text("Включить бота [ "+stonecost+" дерева ]");
		$('#stoneauto').text("Автоматизированно");
		stats();
		$('#stoneb').css("background-color", "gray");
	}
}



function clickiron(pl) {
	if (pl == true && ironauto == true && ironturn == false) {ironturn = true; $('#ironb').text("Выключить бота [ "+ironcost+" камня ]")}
	else if(pl == true && ironauto == true && ironturn == true) {ironturn = false; $('#ironb').text("Включить бота [ "+ironcost+" камня ]")}
	if (irontime == false && stone >= ironcost) {
		irontime = true;
		stone = stone - ironcost;
		stats();
		if (ironauto == false) {$('#ironb').css("background-color", "turquoise")}
		$('#iron').animate({width: $('#ironbg').width()}, ironspeed, function() {
			$('#iron').animate({width: 0}, 0);
			iron = iron + ironcount;
			irontime = false;
			stats();
		});
	}
}
function clickironspeed() {
	if (wood >= ironspeedcost && ironspeed != 0) {
		wood = wood - ironspeedcost;
		ironspeed = ironspeed - 100;
		ironspeedcost = parseInt(ironspeedcost + ironspeedcost / 2.5);
		$('#ironspeed').text("+ к скорости [ "+ironspeedcost+" дерева ]");
		stats();
	}
}
function clickironcount() {
	if (stone >= ironcountcost) {
		stone = stone - ironcountcost;
		ironcount = ironcount + 1;
		ironcost = ironcost + 5;
		ironcountcost = parseInt(ironcountcost + ironcountcost / 2.5);
		$('#ironcount').text("+ к кол-ву [ "+ironcountcost+" камня ]");
		if (ironauto == false) {$('#ironb').text("Произвести [ "+ironcost+" камня ]")}
		stats();
	}
}
function clickironauto(){
	if (iron >= 80) {
		iron = iron - 80;
		ironauto = true;
		$('#ironb').text("Включить бота [ "+ironcost+" камня ]");
		$('#ironauto').text("Автоматизированно");
		stats();
		$('#ironb').css("background-color", "lightseagreen");
	}
}