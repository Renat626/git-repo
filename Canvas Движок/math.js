function worldMath() {
	if (lockMove == false) {
		if (keyw == true && keys == false && going == false) {side = "W"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()-mapWidth == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;gety=y-1;getx=x}}
		if (keya == true && keyd == false && going == false) {side = "A"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()-1 == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;getx=x-1;gety=y}}
		if (keys == true && keyw == false && going == false) {side = "S"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()+mapWidth == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;gety=y+1;getx=x}}
		if (keyd == true && keya == false && going == false) {side = "D"; let canGo = true;for (let i = 0; i < obj.length; i++) {if (pi()+1 == i && solid(obj[i].id) == true) {canGo = false}}; if (canGo) {going=true;getx=x+1;gety=y}}
	}
	if (lockSpace == false) {
		if (space == true && y+3 >= 0 && y+3 <= mapHeight && x+5 >= 0 && x+5 <= mapWidth) {
			if (side == "W" && going == false && y+3 != 0) {action(pi()-mapWidth)}
			if (side == "A" && going == false && x+5 != 0) {action(pi()-1)}
			if (side == "S" && going == false && y+3 != mapHeight) {action(pi()+mapWidth)}
			if (side == "D" && going == false && x+5 != mapWidth) {action(pi()+1)}
			space = false;
		}
	}
	if (lockInv == false) {
		if (keye == true) {
			if (openInv == false) {openInv = true; lockSpace = true; lockMove = true}
			else {
				openInv = false; lockSpace = false; lockMove = false;
				for (let i = craft.length - 1; i >= 0; i--) {invAdd(craft[i].id, 1); craft[i].id = ""}
			}
			keye = false;
		}
	}

	if (openMsg == true && space == true) {
		if (openInv == false) {lockSpace = false; lockMove = false}
		space = false; openMsg = false; lockInv = false;
	}

	if (key1 == true) {key1 = false; invAdd("stick1", 2)}
	if (key2 == true) {key2 = false; invAdd("wood", 23)}
}

function invMath() {
	if (openInv == true && lockInv == false) {
		if (invRel > 0) {invRel--}
		if (craftOpen == false) {
			if (keyw == true && invRel == 0 && invN > 9) {invN-=10; invRel = 4}
			if (keya == true && invRel == 0 && invN != 0 && invN != 10 && invN != 20) {invN--; invRel = 4}
			if (keys == true && invRel == 0 && invN < 20) {invN+=10; invRel = 4}
			if (keyd == true && invRel == 0 && invN != 9 && invN != 19 && invN != 29) {invN++; invRel = 4}
			if (keyq == true) {keyq = false; invQ(invN)}
			if (keyf == true) {keyf = false; craftDo()}
			if (keyr == true) {keyr = false; if (tool(inv[invN].id) == true) {toolN = invN}}
		} else {
			if (keyw == true && invRel == 0 && craftN > 2) {craftN-=3; invRel = 4}
			if (keya == true && invRel == 0 && craftN != 0 && craftN != 3 && craftN != 6) {craftN--; invRel = 4}
			if (keys == true && invRel == 0 && craftN < 6) {craftN+=3; invRel = 4}
			if (keyd == true && invRel == 0 && craftN != 2 && craftN != 5 && craftN != 8) {craftN++; invRel = 4}
			if (keyq == true) {keyq = false; invAdd(craft[craftN].id, 1); craft[craftN].id=""}
		}
		if (space == true) {space = false; craftSpace()}
	}
}

function math() {
	worldMath();
	invMath();
	
	if (going == true) {go()}
}