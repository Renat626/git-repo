var map = [], obj = [], saveObj = [], hp = 100, fp = 100;
var x = 9, y = 4, go = false, inv = false, craft = false, speed = 170, screen = false, lockKeys = true, lockInv = false, lockCraft = false;
var playerSide = "S", craftPage = 1, useKick = true, equip = [0,0,0,0,0]; //ЧО В РУКЕ, ГОЛОВА, ТЕЛО, НОГИ, ПЯТКИ 
var slotItem =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], selectSlot = 0;
var nStone = 0, cave = false, hasCave = false, invClose = false, craftClose = false;

//ГЕНЕРАЦИЯ ПРИ ЗАГРУЗКЕ
$(document).ready(function() {
	$("#page").offset({top: $("#page").offset().top - 30});
	for (var i = 1; i < 2917; i++) {
		$("#area").append("<div id=a"+i+"></div>"); map[i] = 0;
		$("#a" + i).css("background-image", "url(img/grass.png)");

		saveObj[i] = 0;
		if (parseInt(Math.random() * 5) == 0) {saveObj[i] = 6}

		$("#objarea").append("<div id=b"+i+"></div>");
		obj[i] = 0;
		if (parseInt(Math.random() * 10) == 0) {obj[i] = 1}
		if (parseInt(Math.random() * 100) == 0) {obj[i] = 6; nStone++}
		if (parseInt(Math.random() * 200) == 0) {obj[i] = 2}
		if (parseInt(Math.random() * 180) == 0) {obj[i] = 2.2}
		if (parseInt(Math.random() * 120) == 0) {obj[i] = 4}
		if (obj[226] != 0) {obj[226] = 0}
		$("#b" + i).css("background-image", "url("+objtyper(obj[i])+")");
	}
	loadWindow(false);
});

//ТАЙМЕР [ЕДА, ЗДОРОВЬЕ]
setInterval(function() {
	if (screen == false) {$("html").animate({scrollLeft: 0, scrollTop: 0}, 0);}
	if (fp > 0) {fp = fp - 0.025} else {hp = hp - 0.75; fp = 0}
	if (fp > 0 && hp < 100) {hp = hp + 0.05}
	if (hp < 0) {$("#backWindow").css("background-color", "red"); death()}
	if (fp < 95 && fp > 90 && $("#food1").attr("src") != "img/halfFood.png") {$("#food1").attr("src", "img/halfFood.png")}
	if (fp < 90 && $("#food1").attr("src") != "img/darkFood.png") {$("#food1").attr("src", "img/darkFood.png")} else if (fp > 95 && $("#food1").attr("src") != "img/food.png") {$("#food1").attr("src", "img/food.png")}
	if (fp < 85 && fp > 80 && $("#food2").attr("src") != "img/halfFood.png") {$("#food2").attr("src", "img/halfFood.png")}
	if (fp < 80 && $("#food2").attr("src") != "img/darkFood.png") {$("#food2").attr("src", "img/darkFood.png")} else if (fp > 85 && $("#food2").attr("src") != "img/food.png") {$("#food2").attr("src", "img/food.png")}
	if (fp < 75 && fp > 70 && $("#food3").attr("src") != "img/halfFood.png") {$("#food3").attr("src", "img/halfFood.png")}
	if (fp < 70 && $("#food3").attr("src") != "img/darkFood.png") {$("#food3").attr("src", "img/darkFood.png")} else if (fp > 75 && $("#food3").attr("src") != "img/food.png") {$("#food3").attr("src", "img/food.png")}
	if (fp < 65 && fp > 60 && $("#food4").attr("src") != "img/halfFood.png") {$("#food4").attr("src", "img/halfFood.png")}
	if (fp < 60 && $("#food4").attr("src") != "img/darkFood.png") {$("#food4").attr("src", "img/darkFood.png")} else if (fp > 65 && $("#food4").attr("src") != "img/food.png") {$("#food4").attr("src", "img/food.png")}
	if (fp < 55 && fp > 50 && $("#food5").attr("src") != "img/halfFood.png") {$("#food5").attr("src", "img/halfFood.png")}
	if (fp < 50 && $("#food5").attr("src") != "img/darkFood.png") {$("#food5").attr("src", "img/darkFood.png")} else if (fp > 55 && $("#food5").attr("src") != "img/food.png") {$("#food5").attr("src", "img/food.png")}
	if (fp < 45 && fp > 40 && $("#food6").attr("src") != "img/halfFood.png") {$("#food6").attr("src", "img/halfFood.png")}
	if (fp < 40 && $("#food6").attr("src") != "img/darkFood.png") {$("#food6").attr("src", "img/darkFood.png")} else if (fp > 45 && $("#food6").attr("src") != "img/food.png") {$("#food6").attr("src", "img/food.png")}
	if (fp < 35 && fp > 30 && $("#food7").attr("src") != "img/halfFood.png") {$("#food7").attr("src", "img/halfFood.png")}
	if (fp < 30 && $("#food7").attr("src") != "img/darkFood.png") {$("#food7").attr("src", "img/darkFood.png")} else if (fp > 35 && $("#food7").attr("src") != "img/food.png") {$("#food7").attr("src", "img/food.png")}
	if (fp < 25 && fp > 20 && $("#food8").attr("src") != "img/halfFood.png") {$("#food8").attr("src", "img/halfFood.png")}
	if (fp < 20 && $("#food8").attr("src") != "img/darkFood.png") {$("#food8").attr("src", "img/darkFood.png")} else if (fp > 25 && $("#food8").attr("src") != "img/food.png") {$("#food8").attr("src", "img/food.png")}
	if (fp < 15 && fp > 10 && $("#food9").attr("src") != "img/halfFood.png") {$("#food9").attr("src", "img/halfFood.png")}
	if (fp < 10 && $("#food9").attr("src") != "img/darkFood.png") {$("#food9").attr("src", "img/darkFood.png")} else if (fp > 15 && $("#food9").attr("src") != "img/food.png") {$("#food9").attr("src", "img/food.png")}
	if (fp < 5 && fp > 0 && $("#food10").attr("src") != "img/halfFood.png") {$("#food10").attr("src", "img/halfFood.png")}
	if (fp == 0 && $("#food10").attr("src") != "img/darkFood.png") {$("#food10").attr("src", "img/darkFood.png")} else if (fp > 5 && $("#food10").attr("src") != "img/food.png") {$("#food10").attr("src", "img/food.png")}
	if (hp < 95 && hp > 90 && $("#heart1").attr("src") != "img/halfHeart.png") {$("#heart1").attr("src", "img/halfHeart.png")}
	if (hp < 90 && $("#heart1").attr("src") != "img/darkHeart.png") {$("#heart1").attr("src", "img/darkHeart.png")} else if (hp > 95 && $("#heart1").attr("src") != "img/heart.png") {$("#heart1").attr("src", "img/heart.png")}
	if (hp < 85 && hp > 80 && $("#heart2").attr("src") != "img/halfHeart.png") {$("#heart2").attr("src", "img/halfHeart.png")}
	if (hp < 80 && $("#heart2").attr("src") != "img/darkHeart.png") {$("#heart2").attr("src", "img/darkHeart.png")} else if (hp > 85 && $("#heart2").attr("src") != "img/heart.png") {$("#heart2").attr("src", "img/heart.png")}
	if (hp < 75 && hp > 70 && $("#heart3").attr("src") != "img/halfHeart.png") {$("#heart3").attr("src", "img/halfHeart.png")}
	if (hp < 70 && $("#heart3").attr("src") != "img/darkHeart.png") {$("#heart3").attr("src", "img/darkHeart.png")} else if (hp > 75 && $("#heart3").attr("src") != "img/heart.png") {$("#heart3").attr("src", "img/heart.png")}
	if (hp < 65 && hp > 60 && $("#heart4").attr("src") != "img/halfHeart.png") {$("#heart4").attr("src", "img/halfHeart.png")}
	if (hp < 60 && $("#heart4").attr("src") != "img/darkHeart.png") {$("#heart4").attr("src", "img/darkHeart.png")} else if (hp > 65 && $("#heart4").attr("src") != "img/heart.png") {$("#heart4").attr("src", "img/heart.png")}
	if (hp < 55 && hp > 50 && $("#heart5").attr("src") != "img/halfHeart.png") {$("#heart5").attr("src", "img/halfHeart.png")}
	if (hp < 50 && $("#heart5").attr("src") != "img/darkHeart.png") {$("#heart5").attr("src", "img/darkHeart.png")} else if (hp > 55 && $("#heart5").attr("src") != "img/heart.png") {$("#heart5").attr("src", "img/heart.png")}
	if (hp < 45 && hp > 40 && $("#heart6").attr("src") != "img/halfHeart.png") {$("#heart6").attr("src", "img/halfHeart.png")}
	if (hp < 40 && $("#heart6").attr("src") != "img/darkHeart.png") {$("#heart6").attr("src", "img/darkHeart.png")} else if (hp > 45 && $("#heart6").attr("src") != "img/heart.png") {$("#heart6").attr("src", "img/heart.png")}
	if (hp < 35 && hp > 30 && $("#heart7").attr("src") != "img/halfHeart.png") {$("#heart7").attr("src", "img/halfHeart.png")}
	if (hp < 30 && $("#heart7").attr("src") != "img/darkHeart.png") {$("#heart7").attr("src", "img/darkHeart.png")} else if (hp > 35 && $("#heart7").attr("src") != "img/heart.png") {$("#heart7").attr("src", "img/heart.png")}
	if (hp < 25 && hp > 20 && $("#heart8").attr("src") != "img/halfHeart.png") {$("#heart8").attr("src", "img/halfHeart.png")}
	if (hp < 20 && $("#heart8").attr("src") != "img/darkHeart.png") {$("#heart8").attr("src", "img/darkHeart.png")} else if (hp > 25 && $("#heart8").attr("src") != "img/heart.png") {$("#heart8").attr("src", "img/heart.png")}
	if (hp < 15 && hp > 10 && $("#heart9").attr("src") != "img/halfHeart.png") {$("#heart9").attr("src", "img/halfHeart.png")}
	if (hp < 10 && $("#heart9").attr("src") != "img/darkHeart.png") {$("#heart9").attr("src", "img/darkHeart.png")} else if (hp > 15 && $("#heart9").attr("src") != "img/heart.png") {$("#heart9").attr("src", "img/heart.png")}
	if (hp < 5 && hp > 0 && $("#heart10").attr("src") != "img/halfHeart.png") {$("#heart10").attr("src", "img/halfHeart.png")}
	if (hp < 0 && $("#heart10").attr("src") != "img/darkHeart.png") {$("#heart10").attr("src", "img/darkHeart.png")} else if (hp > 5 && $("#heart10").attr("src") != "img/heart.png") {$("#heart10").attr("src", "img/heart.png")}
	if (hp < 10 && hp > 0) {if ($("#redWindow").css("opacity") == 0) {$("#redWindow").animate({opacity: 0.4}, 1000)} else if ($("#redWindow").css("opacity") == 0.4) {$("#redWindow").animate({opacity: 0}, 1000)}}
}, 100);

//НАЖАТИЕ КЛАВИШ
$('html').keydown(function(key) {
	if (lockKeys == false) {
		if (screen == false) {screen = true}
		if (key.which == 71) { // G

		}
		if (key.which == 67) {if (invClose == true) {pressInventory();invClose = false;}; pressCraft();} // C
		if (key.which == 69) {if (craftClose == true) {pressCraft();craftClose = false;}; pressInventory();} // E
		if (lockInv == false && lockCraft == false) { // [GOING]
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
	
					if (playerSide == "W" && obj[w] == 1) {action("tree", w, 8000)}
					if (playerSide == "A" && obj[a] == 1) {action("tree", a, 8000)}
					if (playerSide == "S" && obj[s] == 1) {action("tree", s, 8000)}
			    	if (playerSide == "D" && obj[d] == 1) {action("tree", d, 8000)}

			    	if (playerSide == "W" && obj[w] == 6) {action("stone", w, 5000)}
					if (playerSide == "A" && obj[a] == 6) {action("stone", a, 5000)}
					if (playerSide == "S" && obj[s] == 6) {action("stone", s, 5000)}
			    	if (playerSide == "D" && obj[d] == 6) {action("stone", d, 5000)}

			    	if (playerSide == "W" && obj[w] == 6.1 || playerSide == "W" && obj[w] == 6.2) {action("cave", w, "fix")}
					if (playerSide == "A" && obj[a] == 6.1 || playerSide == "A" && obj[a] == 6.2) {action("cave", a, "fix")}
					if (playerSide == "S" && obj[s] == 6.1 || playerSide == "S" && obj[s] == 6.2) {action("cave", s, "fix")}
			    	if (playerSide == "D" && obj[d] == 6.1 || playerSide == "D" && obj[d] == 6.2) {action("cave", d, "fix")}
				}
				else {if (showModal == true && go == false) {showModalWindow("Инвентарь заполнен", 32)}}
			}
		}
		else if (lockInv == true) { // [INV]
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
					if (useKick == false) {useKick = true; $("#use").css("background-color", "lavender"); $("#kick").css("background-color", "wheat")}
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
					if (useKick == true) {useKick = false; $("#kick").css("background-color", "lavender"); $("#use").css("background-color", "wheat")}
				}
			}
			if (key.which == 32) { // SPACE [INV]
				if ($("#use").text() == "" && selectSlot != 0) {
					$("#use").text("Использовать"); $("#kick").text("Выбросить");
					$("#use").css("background-color", "lavender");
				}
				else {
					if (useKick == true) {useItem()}
					else {kickItem()}
				}
			}
			if (key.which == 49 && equip[0] != 0) { // 1 [INV]
				for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {slotItem[i] = equip[0];equip[0] = 0;invUpdate();i = 32}}
			}
			if (key.which == 50) { // 2 [INV]

			}
		}
		else if (lockCraft == true) { // [CRAFT]
			if (key.which == 65) { // A [CRAFT]
				if (craftPage != 1) {craftPage--;craftUpdate();}
			}
			if (key.which == 68) { // D [CRAFT]
				if (craftPage < 4) {craftPage++;craftUpdate();}
			}
			if (key.which == 32) { // SPACE [CRAFT]
				var canCraft = false, stick = 0, wood = 0, stone = 0;
				for (var i = 1; i < 31; i++) {
					if (slotItem[i] == 0) {canCraft = true}
					if (slotItem[i] == 4) {stick++}
					if (slotItem[i] == 5) {wood++}
					if (slotItem[i] == 6) {stone++}
				}
				if (canCraft == true) {
					// ДЕРЕВЯННЫЙ ТОПОР
					if (craftPage == 1 && stick >= 2 && wood >= 1) {
						stick = 2; wood = 1;
						for (var i = 30; i > 0; i--) {
							if (slotItem[i] == 4 && stick > 0) {stick--;slotItem[i] = 0;invSort(i)}
							if (slotItem[i] == 5 && wood > 0) {wood--;slotItem[i] = 0;invSort(i)}
						}
						invUpdate(); invAddItem(10.1); invUpdate(); craftUpdate(); showModalWindow("Деревянный топор создан", 30);
					} else if (craftPage == 1) {showModalWindow("Недостаточно ресурсов", 32)}
					// ДЕРЕВЯННАЯ КИРКА
					if (craftPage == 2 && stick >= 2 && wood >= 2) {
						stick = 2; wood = 2;
						for (var i = 30; i > 0; i--) {
							if (slotItem[i] == 4 && stick > 0) {stick--;slotItem[i] = 0;invSort(i)}
							if (slotItem[i] == 5 && wood > 0) {wood--;slotItem[i] = 0;invSort(i)}
						}
						invUpdate(); invAddItem(10.2); invUpdate(); craftUpdate(); showModalWindow("Деревянная кирка создана", 30);
					} else if (craftPage == 2) {showModalWindow("Недостаточно ресурсов", 32)}
					// КАМЕННЫЙ ТОПОР
					if (craftPage == 3 && stick >= 2 && stone >= 1) {
						stick = 2; stone = 1;
						for (var i = 30; i > 0; i--) {
							if (slotItem[i] == 4 && stick > 0) {stick--;slotItem[i] = 0;invSort(i)}
							if (slotItem[i] == 6 && stone > 0) {stone--;slotItem[i] = 0;invSort(i)}
						}
						invUpdate(); invAddItem(11.1); invUpdate(); craftUpdate(); showModalWindow("Каменный топор создан", 30);
					} else if (craftPage == 3) {showModalWindow("Недостаточно ресурсов", 32)}
					// КАМЕННАЯ КИРКА
					if (craftPage == 4 && stick >= 2 && stone >= 2) {
						stick = 2; stone = 2;
						for (var i = 30; i > 0; i--) {
							if (slotItem[i] == 4 && stick > 0) {stick--;slotItem[i] = 0;invSort(i)}
							if (slotItem[i] == 6 && stone > 0) {stone--;slotItem[i] = 0;invSort(i)}
						}
						invUpdate(); invAddItem(11.2); invUpdate(); craftUpdate(); showModalWindow("Каменная кирка создана", 30);
					} else if (craftPage == 4) {showModalWindow("Недостаточно ресурсов", 32)}

				} else {showModalWindow("Инвентарь заполнен", 32)}
			}
		}
		if (key.which == 16) {speed = 100} //SHIFT
	}
	else {if (key.which == 32) {if ($("#modalWindow").css("visibility") == "visible") {hideModalWindow()}}}
});

//ВЗАИМОДЕЙСТВИЕ ПРОБЕЛОМ С ОБЬЕКТАМИ
function action(type, n, time, outTime) {
	if (type == "stone" && equip[0] != 10.2 && equip[0] != 11.2) {showModalWindow("Вам нужна кирка чтобы добыть это", 28); return ""}

	if (time != "fix") {
		var w = Math.abs(x + 54 * y - 53), a = Math.abs(x + 54 * y), s = Math.abs(x + 54 * y + 55), d = Math.abs(x + 54 * y + 2);
		lockKeys = true; $("#action").css("left", $("#player").offset().left); $("#action").css("top", $("#player").offset().top - 20); $("#action").css("visibility", "visible");
		var knowItem;
	}
	
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
		obj[n] = 0; invAddItem(5); if (equip[0] == 10.1) {time = 5000}
		if (equip[0] == 11.1) {time = 3000}
		$("#actionLoad").animate({width: $("#action").width()}, time, function() {
			$("#b" + n).css("background-image", "");
			$("#action").css("visibility", "hidden"); lockKeys = false;
			$("#actionLoad").width(0);
		})
	}
	if (type == "stone") {
		var genCave = false; if (parseInt(Math.random() * nStone) == 0 && hasCave == false) {genCave = true} else {nStone--}
		obj[n] = 0; invAddItem(6); if (equip[0] == 11.2) {time = 3000}
		$("#actionLoad").animate({width: $("#action").width()}, time, function() {
			if (genCave == false) {$("#b" + n).css("background-image", "")} else {$("#b" + n).css("background-image", "url(img/caveHole.png)"); obj[n] = 6.1; saveObj[n] = 6.2; hasCave = true;}
			$("#action").css("visibility", "hidden"); lockKeys = false;
			$("#actionLoad").width(0);
		})
	}
	if (type == "cave") {
		var reloadObj = []; loadWindow(true);
		for (var i = 1; i < 2917; i++) {
			if (cave == false) {map[i] = 1; $("#a" + i).css("background-image", "url(img/stoneFloor.png)")} else {map[i] = 0; $("#a" + i).css("background-image", "url(img/grass.png)")}
			reloadObj[i] = saveObj[i]; saveObj[i] = obj[i]; obj[i] = reloadObj[i];
			if (obj[Math.abs(x + 54 * y + 1)] != 0) {obj[Math.abs(x + 54 * y + 1)] = 0}
			$("#b" + i).css("background-image", "url("+objtyper(obj[i])+")");
		}
		if (cave == false) {cave = true} else {cave = false}
		loadWindow(false);
	}
}

function pressInventory() {
	if (inv == false && lockCraft == false) {
		inv = true; invUpdate();
		if (lockInv == false) {lockInv = true}
		else {lockInv = false}
		$("#itemName").text(itemNames(slotItem[selectSlot]));
		if ($("#inv").css("opacity") == 0) {$("#inv").animate({opacity: 1, top: 30}, 350, function() {inv = false; invClose = true});}
		if ($("#inv").css("opacity") == 1) {$("#inv").animate({opacity: 0, top: -parseInt($("#inv").width())}, 350, function() {inv = false; invClose = false})}
		$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat"); useKick = true;
	}
}

function pressCraft() {
	if (craft == false && lockInv == false) {
		craft = true; craftUpdate();
		if (lockCraft == false) {lockCraft = true}
		else {lockCraft = false}
		if ($("#craft").css("opacity") == 0) {$("#craft").animate({opacity: 1, top: 30}, 350, function() {craft = false; craftClose = true}); craftUpdate();}
		if ($("#craft").css("opacity") == 1) {$("#craft").animate({opacity: 0, top: -parseInt($("#craft").width())}, 350, function() {craft = false; craftClose = false});}
	}
}

function craftUpdate() {
	var stick = 0, wood = 0, stone = 0;
	for (var i = 1; i < 31; i++) {
		if (slotItem[i] == 4) {stick++}
		if (slotItem[i] == 5) {wood++}
		if (slotItem[i] == 6) {stone++}
	}
	var craftTitle = [0, "Деревянный топор", "Деревянная кирка", "Каменный топор", "Каменная кирка"];
	var craftNeed1 = [0, "2 палки, ", "2 палки, ", "2 палки, ", "2 палки, "]; 
	var craftNeed2 = [0, "1 дерево", "2 дерева", "1 камень", "2 камня"];
	var craftNeed3 = [0, "", "", "", ""];
	var craftUrl = [0, "img/woodenAxe.png", "img/woodenPickaxe.png", "img/stoneAxe.png", "img/stonePickaxe.png"]
	$("#title").text(craftTitle[craftPage]);
	$("#need1").text(craftNeed1[craftPage]);
	$("#need2").text(craftNeed2[craftPage]);
	$("#need3").text(craftNeed3[craftPage]);
	$("#craftImage").css("background-image", "url("+craftUrl[craftPage]+")");
	$("#page").text(craftPage);
	if (craftPage == 1) { // ДЕРЕВЯННЫЙ ТОПОР
		if (stick < 2) {$("#need1").css("color", "red")} else {$("#need1").css("color", "lime")}
		if (wood < 1) {$("#need2").css("color", "red")} else {$("#need2").css("color", "lime")}
	}
    if (craftPage == 2) { // ДЕРЕВЯННАЯ КИРКА
		if (stick < 2) {$("#need1").css("color", "red")} else {$("#need1").css("color", "lime")}
		if (wood < 2) {$("#need2").css("color", "red")} else {$("#need2").css("color", "lime")}
	}
	if (craftPage == 3) { // КАМЕННЫЙ ТОПОР
		if (stick < 2) {$("#need1").css("color", "red")} else {$("#need1").css("color", "lime")}
		if (stone < 1) {$("#need2").css("color", "red")} else {$("#need2").css("color", "lime")}
	}
	if (craftPage == 4) { // КАМЕННАЯ КИРКА
		if (stick < 2) {$("#need1").css("color", "red")} else {$("#need1").css("color", "lime")}
		if (stone < 2) {$("#need2").css("color", "red")} else {$("#need2").css("color", "lime")}
	}
}

function invUpdate() {
	if (equip[0] != 0) {$("#slotWeapon").css("background-image", "url("+objtyper(equip[0])+")")} else {$("#slotWeapon").css("background-image", "")}
	if (equip[1] != 0) {$("#slotHead").css("background-image", "url("+objtyper(equip[1])+")")} else {$("#slotHead").css("background-image", "")}
	if (equip[2] != 0) {$("#slotBody").css("background-image", "url("+objtyper(equip[2])+")")} else {$("#slotBody").css("background-image", "")}
	if (equip[3] != 0) {$("#slotLegs").css("background-image", "url("+objtyper(equip[3])+")")} else {$("#slotLegs").css("background-image", "")}
	if (equip[4] != 0) {$("#slotFoots").css("background-image", "url("+objtyper(equip[4])+")")} else {$("#slotFoots").css("background-image", "")}

	for (var i = 1; i < 31; i++) {$("#slot" + i).css("background-image", "url("+objtyper(slotItem[i], true)+")");}
	if (slotItem[selectSlot] == 0) {
		selectSlot = 0; 
		for (var i = 1; i < 31; i++) {if (slotItem[i] > 0) {selectSlot = i; i = 32;}}
	}
	$(".slot").css("background-color", "wheat");
	if (selectSlot > 0) {$("#slot" + selectSlot).css("background-color", "lavender")}
}

function useItem() {
	if (slotItem[selectSlot] == 2.1 || slotItem[selectSlot] == 2.3) {
		if (fp < 100) {
			$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat"); useKick = true; slotItem[selectSlot] = 0;
			invSort(selectSlot); invUpdate(); fp = fp + 2.5; return "";
		} else {showModalWindow("Вы не голодны", 38)}
	}
	if (slotItem[selectSlot] == 10.1 || slotItem[selectSlot] == 10.2 || slotItem[selectSlot] == 11.1 || slotItem[selectSlot] == 11.2) {
		var knowItem = slotItem[selectSlot];
		$("#use").text(""); $("#kick").text(""); $("#use").css("background-color", "wheat"); $("#kick").css("background-color", "wheat"); useKick = true; slotItem[selectSlot] = 0;
		if (equip[0] != 0) {slotItem[selectSlot] = equip[0]} else {invSort(selectSlot)}
		equip[0] = knowItem; invUpdate(); return "";
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
	if (type == 1) {return "img/stoneFloor.png"}
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
	if (type == 6) {return "img/stone.png"}
	if (type == 6.1) {return "img/caveHole.png"}
	if (type == 6.2) {return "img/caveUp.png"}
	if (type == 10.1) {return "img/woodenAxe.png"}
	if (type == 10.2) {return "img/woodenPickaxe.png"}
	if (type == 11.1) {return "img/stoneAxe.png"}
	if (type == 11.2) {return "img/stonePickaxe.png"}
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
		if (cant == false) {obj[n] = 0; $("#b" + n).css("background-image", ""); invUpdate();}
		setTimeout(function() {generate(4)}, 60000);
	}
}

function invAddItem(item) {
	var cant = true;
	for (var i = 1; i < 31; i++) {if (slotItem[i] == 0) {slotItem[i] = item; i = 32; cant = false;}}
	if (cant == true) {showModalWindow("Инвентарь заполнен", 32)}
	else {invUpdate()}
} 

function generate(object) {
	var gen = parseInt(Math.random() * 2916);
	if (obj[gen] == 0) {obj[gen] = object; $("#b" + gen).css("background-image", "url("+objtyper(object)+")")} else {generate(object)}
}

function loadWindow(turn) {
	if (turn == false) {$("#loading").css("visibility", "hidden"); $("#ui").css("visibility", "visible"); $("#player").css("visibility", "visible"); lockKeys = false;}
	else {$("#loading").css("visibility", "visible"); $("#ui").css("visibility", "hidden"); $("#player").css("visibility", "hidden"); lockKeys = true;}
}

function itemNames(object) {
	if (object == 2) {return "Красный куст"}
	if (object == 2.1) {return "Красная ягода"}
	if (object == 2.2) {return "Синий куст"}
	if (object == 2.3) {return "Синяя ягода"}
	if (object == 3) {return "Куст"}
	if (object == 4) {return "Палка"}
	if (object == 5) {return "Дерево"}
	if (object == 6) {return "Камень"}
	if (object == 10.1) {return "Деревянный топор"}
	if (object == 10.2) {return "Деревянная кирка"}
	if (object == 11.1) {return "Каменный топор"}
	if (object == 11.2) {return "Каменная кирка"}
    return "";
}

function invSort(deletedSlot) {for (var i = deletedSlot; i < 31; i++) {slotItem[i] = slotItem[i + 1]}}

$('html').keyup(function(key) {
	if (key.which == 16) {speed = 170} //SHIFT
});