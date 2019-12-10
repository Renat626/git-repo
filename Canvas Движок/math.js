function worldMath() {
	if (lockMove == false) {
		if (keyw == true && keys == false && going == false) {side = "playerW"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()-mapWidth == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;gety=y-1;getx=x}}
		if (keya == true && keyd == false && going == false) {side = "playerA"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()-1 == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;getx=x-1;gety=y}}
		if (keys == true && keyw == false && going == false) {side = "playerS"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()+mapWidth == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;gety=y+1;getx=x}}
		if (keyd == true && keya == false && going == false) {side = "playerD"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()+1 == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;getx=x+1;gety=y}}
	}
	if (lockSpace == false) {
		if (space == true && y+3 >= 0 && y+3 <= mapHeight && x+5 >= 0 && x+5 <= mapWidth) {
			if (side == "playerW" && going == false && y+3 != 0) {action(pi()-mapWidth)}
			if (side == "playerA" && going == false && x+5 != 0) {action(pi()-1)}
			if (side == "playerS" && going == false && y+3 != mapHeight) {action(pi()+mapWidth)}
			if (side == "playerD" && going == false && x+5 != mapWidth) {action(pi()+1)}
			space = false;
		}
	}
	if (lockInv == false) {
		if (keye == true) {
			if (invOpen == false) {invOpen = true; lockSpace = true; lockMove = true}
			else {
				invOpen = false; lockSpace = false; lockMove = false;
				for (let i = craft.length - 1; i >= 0; i--) {invAdd(craft[i].id, craft[i].n); craft[i].id = ""}
				if (invCut.id != "") {invAdd(invCut.id, invCut.n); invCut.id=""}
			}
			keye = false;
		}
	}

	if (openMsg == true && space == true) {
		if (invOpen == false) {lockSpace = false; lockMove = false}
		space = false; openMsg = false; lockInv = false;
	}

	if (key1 == true) {key1 = false; hotbarN = 0}
	if (key2 == true) {key2 = false; hotbarN = 1}
	if (key3 == true) {key3 = false; hotbarN = 2}
	if (key4 == true) {key4 = false; hotbarN = 3}
	if (key5 == true) {key5 = false; hotbarN = 4}
	if (key6 == true) {key6 = false; hotbarN = 5}
	if (key7 == true) {key7 = false; hotbarN = 6}
	if (key8 == true) {key8 = false; hotbarN = 7}
	if (key9 == true) {key9 = false; hotbarN = 8}
	if (key0 == true) {key0 = false; hotbarN = 9}

	if (keyf == true) {keyf = false; useItem()}
	if (keyq == true && invOpen	== false) {keyq = false; invQ(hotbarN)}

	if (invOpen == false) {
		if (food >= 0) {food-=0.005} else {health-=0.02}
		if (health <= 0) {
			msg("Вы погибли и все ваши вещи пропадут","Однако мир будет сохранён со всеми","вашими постройками в нём");
			health = 100; food = 100; for (let i = inv.length - 1; i >= 0; i--) {inv[i].id=  ""}; invCut.id = "";
			x = 0; y = 0; getX = 0; getY = 0; going = false; side = "playerS";
		}
	}
}

function invMath() {
	if (invOpen == true && lockInv == false) {
		if (invRel > 0) {invRel--}
		if (craftOpen == false) {
			if (keyw == true && invRel == 0 && invN > 9) {invN-=10; invRel = 9}
			if (keya == true && invRel == 0 && invN != 0 && invN != 10 && invN != 20) {invN--; invRel = 9}
			if (keys == true && invRel == 0) {
				invN+=10; invRel = 9; 
				if (invN >= 30) {
					if (invN-10 < 26) {craftN = 0} else if (invN-10 == 26) {craftN = 1} else {craftN = 2}
					invN = 0; craftOpen=true;
				}
			}
			if (keyd == true && invRel == 0 && invN != 9 && invN != 19 && invN != 29) {invN++; invRel = 9}
			if (keyq == true) {keyq = false; invQ(invN)}
		} else {
			if (keyw == true && invRel == 0) {
				craftN-=3; invRel = 9; 
				if (craftN < 0) {
					if (craftN+3 == 0) {invN = 25} else if (craftN+3 == 1) {invN = 26} else {invN = 27}
					craftN=0; craftOpen=false;
				}
			}
			if (keya == true && invRel == 0 && craftN != 0 && craftN != 3 && craftN != 6) {craftN--; invRel = 9}
			if (keys == true && invRel == 0 && craftN < 6) {craftN+=3; invRel = 9}
			if (keyd == true && invRel == 0 && craftN != 2 && craftN != 5 && craftN != 8) {craftN++; invRel = 9}
			if (keyq == true) {keyq = false; invAdd(craft[craftN].id, craft[craftN].n); craft[craftN].id=""}
		}
		if (space == true) {space = false; craftSpace()}
		if (keyr == true) {keyr = false; craftDo()}
	}
}

function math() {
	worldMath();
	invMath();
	
	if (going == true) {go()}
}