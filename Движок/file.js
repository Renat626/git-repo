var map = [], obj = [], hp = 11, fp = 2;
var x = 9, y = 4, go = false, inv = false, craft = false, speed = 170, screen = false, lockKeys = true, lockInv = false, lockCraft = false;
var playerSide = "S", craftPage = 1, useKick = true, equip = [0,0,0,0,0]; //ОРУЖИЕ, ГОЛОВА, ТЕЛО, НОГИ, ПЯТКИ 
var slotItem =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], selectSlot = 0;

//ГЕНЕРАЦИЯ ПРИ ЗАГРУЗКЕ
$(document).ready(function() {
	$("#page").offset({top: $("#page").offset().top - 30});
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
		if (parseInt(Math.random() * 120) == 0) {obj[i] = 4}
		if (parseInt(Math.random() * 1000) == 0) {obj[i] = 9}
		if (obj[226] != 0) {obj[226] = 0}
		$("#b" + i).css("background-image", "url("+objtyper(obj[i])+")");
		if (i == 2916) {$("#loading").remove(); $("#ui").css("visibility", "visible"); $("#player").css("visibility", "visible"); lockKeys = false;}
	} 
});

//ТАЙМЕР [ЕДА, ЗДОРОВЬЕ]
setInterval(function() {
	if (screen == false) {$("html").animate({scrollLeft: 0, scrollTop: 0}, 0);}
	if (fp > 0) {fp = fp - 0.012} else {hp = hp - 0.05; fp = 0}
	if (fp > 0 && hp < 100) {hp = hp + 0.05}
	if (hp < 0) {$("#backWindow").css("background-color", "red"); death()}
	if (fp < 90 && $("#food1").attr("src") != "img/darkfood.png") {$("#food1").attr("src", "img/darkfood.png")} else if (fp > 90 && $("#food1").attr("src") != "img/food.png") {$("#food1").attr("src", "img/food.png")}
	if (fp < 80 && $("#food2").attr("src") != "img/darkfood.png") {$("#food2").attr("src", "img/darkfood.png")} else if (fp > 80 && $("#food2").attr("src") != "img/food.png") {$("#food2").attr("src", "img/food.png")}
	if (fp < 70 && $("#food3").attr("src") != "img/darkfood.png") {$("#food3").attr("src", "img/darkfood.png")} else if (fp > 70 && $("#food3").attr("src") != "img/food.png") {$("#food3").attr("src", "img/food.png")}
	if (fp < 60 && $("#food4").attr("src") != "img/darkfood.png") {$("#food4").attr("src", "img/darkfood.png")} else if (fp > 60 && $("#food4").attr("src") != "img/food.png") {$("#food4").attr("src", "img/food.png")}
	if (fp < 50 && $("#food5").attr("src") != "img/darkfood.png") {$("#food5").attr("src", "img/darkfood.png")} else if (fp > 50 && $("#food5").attr("src") != "img/food.png") {$("#food5").attr("src", "img/food.png")}
	if (fp < 40 && $("#food6").attr("src") != "img/darkfood.png") {$("#food6").attr("src", "img/darkfood.png")} else if (fp > 40 && $("#food6").attr("src") != "img/food.png") {$("#food6").attr("src", "img/food.png")}
	if (fp < 30 && $("#food7").attr("src") != "img/darkfood.png") {$("#food7").attr("src", "img/darkfood.png")} else if (fp > 30 && $("#food7").attr("src") != "img/food.png") {$("#food7").attr("src", "img/food.png")}
	if (fp < 20 && $("#food8").attr("src") != "img/darkfood.png") {$("#food8").attr("src", "img/darkfood.png")} else if (fp > 20 && $("#food8").attr("src") != "img/food.png") {$("#food8").attr("src", "img/food.png")}
	if (fp < 10 && $("#food9").attr("src") != "img/darkfood.png") {$("#food9").attr("src", "img/darkfood.png")} else if (fp > 10 && $("#food9").attr("src") != "img/food.png") {$("#food9").attr("src", "img/food.png")}
	if (fp == 0 && $("#food10").attr("src") != "img/darkfood.png") {$("#food10").attr("src", "img/darkfood.png")} else if (fp > 0 && $("#food10").attr("src") != "img/food.png") {$("#food10").attr("src", "img/food.png")}
	if (hp < 90 && $("#heart1").attr("src") != "img/darkheart.png") {$("#heart1").attr("src", "img/darkheart.png")} else if (hp > 90 && $("#heart1").attr("src") != "img/heart.png") {$("#heart1").attr("src", "img/heart.png")}
	if (hp < 80 && $("#heart2").attr("src") != "img/darkheart.png") {$("#heart2").attr("src", "img/darkheart.png")} else if (hp > 80 && $("#heart2").attr("src") != "img/heart.png") {$("#heart2").attr("src", "img/heart.png")}
	if (hp < 70 && $("#heart3").attr("src") != "img/darkheart.png") {$("#heart3").attr("src", "img/darkheart.png")} else if (hp > 70 && $("#heart3").attr("src") != "img/heart.png") {$("#heart3").attr("src", "img/heart.png")}
	if (hp < 60 && $("#heart4").attr("src") != "img/darkheart.png") {$("#heart4").attr("src", "img/darkheart.png")} else if (hp > 60 && $("#heart4").attr("src") != "img/heart.png") {$("#heart4").attr("src", "img/heart.png")}
	if (hp < 50 && $("#heart5").attr("src") != "img/darkheart.png") {$("#heart5").attr("src", "img/darkheart.png")} else if (hp > 50 && $("#heart5").attr("src") != "img/heart.png") {$("#heart5").attr("src", "img/heart.png")}
	if (hp < 40 && $("#heart6").attr("src") != "img/darkheart.png") {$("#heart6").attr("src", "img/darkheart.png")} else if (hp > 40 && $("#heart6").attr("src") != "img/heart.png") {$("#heart6").attr("src", "img/heart.png")}
	if (hp < 30 && $("#heart7").attr("src") != "img/darkheart.png") {$("#heart7").attr("src", "img/darkheart.png")} else if (hp > 30 && $("#heart7").attr("src") != "img/heart.png") {$("#heart7").attr("src", "img/heart.png")}
	if (hp < 20 && $("#heart8").attr("src") != "img/darkheart.png") {$("#heart8").attr("src", "img/darkheart.png")} else if (hp > 20 && $("#heart8").attr("src") != "img/heart.png") {$("#heart8").attr("src", "img/heart.png")}
	if (hp < 10 && $("#heart9").attr("src") != "img/darkheart.png") {$("#heart9").attr("src", "img/darkheart.png")} else if (hp > 10 && $("#heart9").attr("src") != "img/heart.png") {$("#heart9").attr("src", "img/heart.png")}
	if (hp < 0 && $("#heart10").attr("src") != "img/darkheart.png") {$("#heart10").attr("src", "img/darkheart.png")} else if (hp > 0 && $("#heart10").attr("src") != "img/heart.png") {$("#heart10").attr("src", "img/heart.png")}
	if (hp < 10 && hp > 0) {if ($("#redWindow").css("opacity") == 0) {$("#redWindow").animate({opacity: 0.4}, 1000)} else if ($("#redWindow").css("opacity") == 0.4) {$("#redWindow").animate({opacity: 0}, 1000)}}
}, 100);

//НАЖАТИЕ КЛАВИШ
$('html').keydown(function(key) {
	if (lockKeys == false) {
		if (screen == false) {screen = true}
		if (key.which == 67) { // C
			if (craft == false && lockInv == false) {
				craft = true; craftUpdate();
				if (lockCraft == false) {lockCraft = true}
				else {lockCraft = false}
				if ($("#craft").css("opacity") == 0) {$("#craft").animate({opacity: 1, top: 30}, 350, function() {craft = false});}
				if ($("#craft").css("opacity") == 1) {$("#craft").animate({opacity: 0, top: -parseInt($("#craft").width())}, 350, function() {craft = false});}
				if ($("#craft").css("opacity") == 0) {craftUpdate()}
			}
		}
		if (key.which == 69) { // E
			if (inv == false && lockCraft == false) {
				inv = true; invUpdate();
				if (lockInv == false) {lockInv = true}
				else {lockInv = false}
				if ($("#inv").css("opacity") == 0) {$("#inv").animate({opacity: 1, top: 30}, 350, function() {inv = false});}
				if ($("#inv").css("opacity") == 1) {$("#inv").animate({opacity: 0, top: -parseInt($("#inv").width())}, 350, function() {inv = false})}
				$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat"); useKick = true;
			}
		}
		if (lockInv == false && lockCraft == false) {
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
				var w = Math.abs(x + 54 * y - 53), a = Math.abs(x + 54 * y), s = Math.abs(x + 54 * y + 55), d = Math.abs(x + 54 * y + 2);
				var cant = true; var showModal = true; for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {cant = false; i = 32;}}
				if (playerSide == "W" && spaceable(obj[w]) == "no" || playerSide == "A" && spaceable(obj[a]) == "no" || playerSide == "S" && spaceable(obj[s]) == "no" || playerSide == "D" && spaceable(obj[d]) == "no") {showModal = false}
				if (cant == false && go == false) {				
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
				else {if (showModal == true && go == false) {showModalWindow("Инвентарь заполнен", 32)}}
			}
		}
		else if (lockInv == true) {
			var maxInv = 0; for (var i = 1; i < 31; i++) {if (slotItem[i] > 0) {maxInv++}}
			if (key.which == 87) { // W [INV]
				if ($("#use").text() == "") {
					if (maxInv > 10 && selectSlot > 10) {selectSlot -= 10}
				    invUpdate();
				}
			}
			if (key.which == 65) { // A [INV]
				if ($("#use").text() == "") {
					if (selectSlot != 1 && selectSlot != 11 && selectSlot != 21) {selectSlot--}
					invUpdate();
				}
				else {
					if (useKick == false) {useKick = true; $("#use").css("background-color", "mistyrose"); $("#kick").css("background-color", "wheat")}
				}
			}
			if (key.which == 83) { // S [INV]
				if ($("#use").text() == "") {
					if (maxInv > 10 && selectSlot < 21) {selectSlot += 10}
					for (var i = 1; i < 31; i++) {if (selectSlot > maxInv) {selectSlot--} else {i = 32}}
					invUpdate();
				}
				else {
					$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat"); useKick = true;
				}
			}
			if (key.which == 68) { // D [INV]
				if ($("#use").text() == "") {
					if (selectSlot < maxInv && selectSlot != 10 && selectSlot != 20) {selectSlot++}
					invUpdate();
				}	
				else {
					if (useKick == true) {useKick = false; $("#kick").css("background-color", "mistyrose"); $("#use").css("background-color", "wheat")}
				}
			}
			if (key.which == 32) { // SPACE [INV]
				if ($("#use").text() == "" && selectSlot != 0) {
					$("#use").text("Использовать"); $("#kick").text("Выбросить");
					$("#use").css("background-color", "mistyrose");
				}
				else {
					if (useKick == true) {useItem()}
					else {kickItem()}
				}
			}
		}
		else if (lockCraft == true) {
			if (key.which == 65) { // A [CRAFT]
				if (craftPage != 1) {craftPage--;craftUpdate();}
			}
			if (key.which == 68) { // D [CRAFT]
				if (craftPage < 2) {craftPage++;craftUpdate();}
			}
			if (key.which == 32) { // SPACE [CRAFT]

			}
		}
		if (key.which == 16) {speed = 100} //SHIFT
		if (key.which == 49) {invAddItem(4)} // 1
		if (key.which == 50) {invAddItem(2.3)} // 2
	}
	else {if (key.which == 32) {if ($("#modalWindow").css("visibility") == "visible") {hideModalWindow()}}}
});

function craftUpdate() {
	var stick = 0, wood = 0;
	for (var i = 1; i < 31; i++) {
		if (slotItem[i] == 4) {stick++}
		if (slotItem[i] == 5) {wood++}
	}
	var craftTitle = [0, "Деревянный топор", "Деревянная кирка"];
	var craftNeed1 = [0, "2 палки, ", "2 палки, "]; 
	var craftNeed2 = [0, "1 дерево", "2 дерева"];
	var craftNeed3 = [0, "", ""];
	var craftUrl = [0, "img/woodenAxe.png", "img/woodenPickaxe.png"]
	$("#title").text(craftTitle[craftPage]);
	$("#need1").text(craftNeed1[craftPage]);
	$("#need2").text(craftNeed2[craftPage]);
	$("#need3").text(craftNeed3[craftPage]);
	$("#craftImage").css("background-image", "url("+craftUrl[craftPage]+")");
	$("#page").text(craftPage);
	if (craftPage == 1) {
		if (stick < 2) {$("#need1").css("color", "red")} else {$("#need1").css("color", "lime")}
		if (wood < 1) {$("#need2").css("color", "red")} else {$("#need2").css("color", "lime")}
	}
    if (craftPage == 2) {
		if (stick < 2) {$("#need1").css("color", "red")} else {$("#need1").css("color", "lime")}
		if (wood < 2) {$("#need2").css("color", "red")} else {$("#need2").css("color", "lime")}
	}
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

//ВЗАИМОДЕЙСТВИЕ ПРОБЕЛОМ С ОБЬЕКТАМИ
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
		obj[n] = 0; invAddItem(5);
		$("#actionLoad").animate({width: $("#action").width()}, time, function() {
			$("#b" + n).css("background-image", "");
			$("#action").css("visibility", "hidden"); lockKeys = false;
			$("#actionLoad").width(0);
		})
	}
}

function useItem() {
	if (slotItem[selectSlot] == 2.1 || slotItem[selectSlot] == 2.3) {
		$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat");
		useKick = true; slotItem[selectSlot] = 0; 
		for (var i = selectSlot; i < 31; i++) {slotItem[i] = slotItem[i + 1]}
		invUpdate(); fp = fp + 2.5;
	}
}

function kickItem() {
	$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat");
	useKick = true; slotItem[selectSlot] = 0; 
	for (var i = selectSlot; i < 31; i++) {slotItem[i] = slotItem[i + 1]}
	invUpdate();
}

function physics(object) {
	if (object == 0 || object == 4) {return "no"}
	return "yes";
}

function spaceable(object) {
	if (object == 0 || object == 4 || object == 9) {return "no"}
	return "yes";
}

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
	if (type == 5) {return "img/wood.png"}
	if (type == 9) {return "img/chuvak.gif"}
	return "img/error.png";
}

function hideModalWindow() {
	lockKeys = false;
	$("#backWindow").css("visibility", "hidden"); 
	$("#modalWindow").css("visibility", "hidden");
}

function showModalWindow(text, size) {
	lockKeys = true;
	$("#modalWindow").text(text);
	$("#modalWindow").css("font-size", size + "px");
	$("#backWindow").css("visibility", "visible"); 
	$("#modalWindow").css("visibility", "visible");
}

function death() {
	showModalWindow("Вы погибли, мир будет перезагружен через 5 секунд", 20);
	setTimeout(function() {document.location.reload(true)}, 5000)
}

function pickuping() {
	var n = Math.abs(x + 54 * y + 1);
	if (obj[n] == 4) {
		var cant = true;
		for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {slotItem[i] = 4; i = 32; cant = false;}}
		if (cant == true) {showModalWindow("Инвентарь заполнен", 32)}
		else {obj[n] = 0; $("#b" + n).css("background-image", ""); invUpdate();}
	}
}

function invAddItem(item) {
	var cant = true;
	for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {slotItem[i] = item; i = 32; cant = false;}}
	if (cant == true) {showModalWindow("Инвентарь заполнен", 32)}
	else {invUpdate()}
} 

$('html').keyup(function(key) {
	if (key.which == 16) {speed = 170} //SHIFT
});