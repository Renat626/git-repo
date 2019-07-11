var map = [], obj = [], hp = 100, fp = 100;
var x = 9, y = 4, go = false, inv = false, speed = 170, screen = false, lockKeys = true, lockInv = false;
var playerSide = "S", equip = [0,0,0,0,0]; //ОРУЖИЕ, ГОЛОВА, ТЕЛО, НОГИ, ПЯТКИ 
var slotItem =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], selectSlot = 0;

$(document).ready(function() {
	for (var i = 1; i < 2917; i++) {
		$("#area").append("<div id=a"+i+"></div>");
		map[i] = 0;
		$("#a" + i).css("background-image", "url("+maptyper(map[i])+")");
	}
	for (var i = 1; i < 2917; i++) {
		$("#objarea").append("<div id=b"+i+"></div>");
		obj[i] = 0;
		if (parseInt(Math.random() * 10) == 0) {obj[i] = 1}
		if (parseInt(Math.random() * 200) == 0) {obj[i] = 2}
		if (parseInt(Math.random() * 180) == 0) {obj[i] = 2.2}
		if (parseInt(Math.random() * 100) == 0) {obj[i] = 4}
		if (parseInt(Math.random() * 1000) == 0) {obj[i] = 9}
		if (obj[226] != 0) {obj[226] = 0}
		$("#b" + i).css("background-image", "url("+objtyper(obj[i])+")");
		if (i == 2916) {$("#loading").remove(); $("#ui").css("visibility", "visible"); $("#player").css("visibility", "visible"); lockKeys = false;}
	}
});
setInterval(function() {
	if (screen == false) {$("html").animate({scrollLeft: 0, scrollTop: 0}, 0);}
}, 100);
function maptyper(type) {
	if (type == 0) {return "img/grass.png"}
	return "img/error.png";
}
function objtyper(type, fix) {
	if (type == 0) {return ""}
	if (type == 1) {return "img/tree.png"}
	if (type == 2) {return "img/redbush.png"}
	if (type == 2.1) {return "img/redberry.png"}
	if (type == 2.2) {return "img/bluebush.png"}
	if (type == 2.3) {return "img/blueberry.png"}
	if (type == 3) {return "img/bush.png"}
	if (type == 4 && fix == true) {return "img/stick1.png"}
	if (type == 4) {if (parseInt(Math.random() * 2) == 0) {return "img/stick1.png"} else {{return "img/stick2.png"}}}
	if (type == 9) {return "img/chuvak.gif"}
	return "img/error.png";
}
function pickuping() {
	var n = Math.abs(x + 54 * y + 1);
	if (obj[n] == 4) {
		var cant = true;
		for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {slotItem[i] = 4; i = 32; cant = false;}}
		if (cant == true) {showModalWindow()}
		else {obj[n] = 0; $("#b" + n).css("background-image", ""); invUpdate();}
	}
}
function invAddItem(item) {
	var cant = true;
	for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {slotItem[i] = item; i = 32; cant = false;}}
	if (cant == true) {showModalWindow()}
	else {invUpdate()}
} 
function invUpdate() {
	for (var i = 1; i < 31; i++) {$("#slot" + i).css("background-image", "url("+objtyper(slotItem[i], true)+")");}
	if (slotItem[selectSlot] == 0) {
		selectSlot = 0; 
		for (var i = 1; i < 31; i++) {if (slotItem[i] > 0) {selectSlot = i; i = 32;}}
	}
	$(".slot").css("background-color", "wheat");
	if (selectSlot > 0) {$("#slot" + selectSlot).css("background-color", "mistyrose")}
}
$('html').keydown(function(key) {
	if (lockKeys == false) {
		if (screen == false) {screen = true}
		if (key.which == 69) { // E
			if (inv == false) {
				inv = true; invUpdate();
				if (lockInv == false) {lockInv = true}
				else {lockInv = false}
				if ($("#inv").css("opacity") == 0) {$("#inv").animate({opacity: 1, top: 30}, 350, function() {inv = false});}
				if ($("#inv").css("opacity") == 1) {$("#inv").animate({opacity: 0, top: -parseInt($("#inv").width())}, 350, function() {inv = false});}
			}
		}
		if (lockInv == false) {
			if (key.which == 87 && go == false) { // W
				if (playerSide != "W") {$("#player").css("background-image", "url(img/playerW.png)"); playerSide = "W";}
				if (y != 0 && physics(obj[Math.abs(x + 54 * y - 53)]) == "no") {
					y--;go = true;$("html").animate({scrollTop: (y - 4) * ($(window).height() / 9)}, speed, function() {go = false});
					$("#player").animate({top: $("#player").offset().top - ($(window).height() / 9)}, speed);
					setTimeout(function() {pickuping()}, speed);
				}
			}
			if (key.which == 65 && go == false) { // A
				if (playerSide != "A") {$("#player").css("background-image", "url(img/playerA.png)");playerSide = "A";}
				if (x != 0 && physics(obj[Math.abs(x - 1 + 54 * y + 1)]) == "no") {
					x--;go = true;$("html").animate({scrollLeft: (x - 9) * ($(window).width() / 19)}, speed, function() {go = false});
					$("#player").animate({left: $("#player").offset().left - ($(window).width() / 19)}, speed);
					setTimeout(function() {pickuping()}, speed);
				}
			}
			if (key.which == 83 && go == false) { // S
				if (playerSide != "S") {$("#player").css("background-image", "url(img/playerS.png)");playerSide = "S";}
				if (y != 53 && physics(obj[Math.abs(x + 54 * y + 55)]) == "no") {
					y++;go = true;$("html").animate({scrollTop: (y - 4) * ($(window).height() / 9)}, speed, function() {go = false});
					$("#player").animate({top: $("#player").offset().top + ($(window).height() / 9)}, speed);
					setTimeout(function() {pickuping()}, speed);
				}
			}
			if (key.which == 68 && go == false) { // D
				if (playerSide != "D") {$("#player").css("background-image", "url(img/playerD.png)");playerSide = "D";}
				if (x != 53 && physics(obj[Math.abs(x - 1 + 54 * y + 3)]) == "no") {
					x++;go = true;$("html").animate({scrollLeft: (x - 9) * ($(window).width() / 19)}, speed, function() {go = false});
					$("#player").animate({left: $("#player").offset().left + ($(window).width() / 19)}, speed);
					setTimeout(function() {pickuping()}, speed);
				}
			}
			if (key.which == 32) { // SPACE
				var cant = true; for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {cant = false; i = 32;}}
				if (cant == false) {
					var w = Math.abs(x + 54 * y - 53), a = Math.abs(x + 54 * y), s = Math.abs(x + 54 * y + 55), d = Math.abs(x + 54 * y + 2);
				
					if (playerSide == "W" && obj[w] == 2) {action("bush", w, 1000, 30000)}
					if (playerSide == "A" && obj[a] == 2) {action("bush", a, 1000, 30000)}
					if (playerSide == "S" && obj[s] == 2) {action("bush", s, 1000, 30000)}
					if (playerSide == "D" && obj[d] == 2) {action("bush", d, 1000, 30000)}
	
					if (playerSide == "W" && obj[w] == 2.2) {action("bush", w, 1000, 30000)}
					if (playerSide == "A" && obj[a] == 2.2) {action("bush", a, 1000, 30000)}
					if (playerSide == "S" && obj[s] == 2.2) {action("bush", s, 1000, 30000)}
					if (playerSide == "D" && obj[d] == 2.2) {action("bush", d, 1000, 30000)}
	
					if (playerSide == "W" && obj[w] == 1 && equip[0] == 0) {action("tree", w, 8000)}
					if (playerSide == "A" && obj[a] == 1 && equip[0] == 0) {action("tree", a, 8000)}
					if (playerSide == "S" && obj[s] == 1 && equip[0] == 0) {action("tree", s, 8000)}
			    	if (playerSide == "D" && obj[d] == 1 && equip[0] == 0) {action("tree", d, 8000)}
				}
				else {showModalWindow()}
			}
		}
		else {
			var maxInv = 0; for (var i = 1; i < 31; i++) {if (slotItem[i] > 0) {maxInv++}}
			if (key.which == 87 && go == false) { // W [INV]
				if (maxInv > 10 && selectSlot > 10) {selectSlot -= 10}
				invUpdate();
			}
			if (key.which == 65 && go == false) { // A [INV]
				if (selectSlot != 1 && selectSlot != 11 && selectSlot != 21) {selectSlot--}
				invUpdate();
			}
			if (key.which == 83 && go == false) { // S [INV]
				if (maxInv > 10 && selectSlot < 21) {selectSlot += 10}
				for (var i = 1; i < 31; i++) {if (selectSlot > maxInv) {selectSlot--} else {i = 32}}
				invUpdate();
			}
			if (key.which == 68 && go == false) { // D [INV]
				if (selectSlot < maxInv && selectSlot != 10 && selectSlot != 20) {selectSlot++}
				invUpdate();
			}
			if (key.which == 32) { // SPACE [INV]
				invAddItem(2.3);
			}
		}
		if (key.which == 16) {speed = 100} //SHIFT
	}
});

function action(type, n, time, outTime) {
	var w = Math.abs(x + 54 * y - 53), a = Math.abs(x + 54 * y), s = Math.abs(x + 54 * y + 55), d = Math.abs(x + 54 * y + 2);
	lockKeys = true; $("#action").css("left", $("#player").offset().left); $("#action").css("top", $("#player").offset().top - 20); $("#action").css("visibility", "visible");
	var knowItem;
	if (type == "bush") {
		if (obj[n] == 2.2) {invAddItem(2.3); knowItem = 2} else {invAddItem(2.1); knowItem = 1}
		obj[n] = 3;
		$("#actionLoad").animate({width: $("#action").width()}, time, function() {
		    $("#b" + n).css("background-image", "url(img/bush.png)");
		    setTimeout(function() {
		    	if (knowItem == 1) {$("#b" + n).css("background-image", "url(img/redbush.png)"); obj[n] = 2}
		    	else {$("#b" + n).css("background-image", "url(img/bluebush.png)"); obj[n] = 2.2}
		    }, outTime);
			$("#action").css("visibility", "hidden"); lockKeys = false;
			$("#actionLoad").width(0);
		})
	}
	if (type == "tree") {
		obj[n] = 0;
		$("#actionLoad").animate({width: $("#action").width()}, time, function() {
			$("#b" + n).css("background-image", "");
			$("#action").css("visibility", "hidden"); lockKeys = false;
			$("#actionLoad").width(0);
		})
	}
}

$('html').keyup(function(key) {
	if (key.which == 16) {speed = 170} //SHIFT
});

function physics(object) {
	if (object == 0 || object == 4) {return "no"}
	return "yes"
}

function hideModalWindow() {
	lockKeys = false;
	$("#backWindow").css("visibility", "hidden"); 
	$("#modalWindow").css("visibility", "hidden");
}

function showModalWindow() {
	lockKeys = true; 
	$("#backWindow").css("visibility", "visible"); 
	$("#modalWindow").css("visibility", "visible");
}