function loadFunc() {
	ctx.fillStyle = "green"; ctx.fillRect(500,280,100,20); ctx.fillStyle = "lime"; ctx.fillRect(500,280,load,20); load+=loadStep;
	if (load == 100) {
		lockMove=false; lockSpace=false; lockInv=false;
		if (obj[curObj].id == "tree") {obj[curObj].id=""}
		if (obj[curObj].id == "bluebush") {obj[curObj].id="bush"; invAdd("blueberry", 1); let a=curObj; setTimeout(function(){obj[a].id="bluebush"},30000)}
		if (obj[curObj].id == "redbush") {obj[curObj].id="bush"; invAdd("redberry", 1); let a=curObj; setTimeout(function(){obj[a].id="redbush"},30000)}
	}
}


function invAdd(id, n) {
	canPlus=canNew=false;
	for (let i = 29; i >= 0; i--) {
		if (inv[i].id == id && inv[i].n < inv[i].m) {inv[i].n+=n; if (inv[i].n > inv[i].m) {n = inv[i].n - inv[i].m; inv[i].n = inv[i].m} else {canPlus = true; canNew = true}}
	}
	if (canPlus == false) {
		for (let i = 0; i < 30; i++) {
			if (inv[i].id == "") {inv[i].id = id; inv[i].n = n; inv[i].m = max(inv[i].id); i=30; canNew = true}
		}
	}
	if (canNew == false) {
		msg("","Инвентарь заполнен, освободите место","");
	}
}
function invQ(n) {
	inv[n].n--; keyq = false;
	if (inv[n].n == 0) {
		inv[n].id == ""; for (let i = n; i < 30; i++) {inv[i].n = inv[i+1].n; inv[i].id = inv[i+1].id; inv[i].m = inv[i+1].m}
	}
}


function craftSpace() {
	if (craftOpen == false) {craftOpen = true}
	else if (craftOpen == true) {
		craftOpen = false;
		if (inv[invN].id != "") {invAdd(craft[craftN].id, 1); craft[craftN].id = inv[invN].id; invQ(invN)}
	}
}
function craftDo() {
	id = craftCheck(true).id; n = craftCheck(true).n;
	if (id != "") {for (let i = craft.length - 1; i >= 0; i--) {craft[i].id = ""}; invAdd(id, n)}
}
function craftCheck(give) {
	id = ""; n = 1; // if (recipe("","","","","","","","","") == true) {id = ""; n = 1}
	if (recipe("wood","wood","wood","","stick1","","","stick1","") == true) {id = "woodenPickaxe"}
	if (recipe("wood","","","","","","","","") == true) {id = "stick1"; n = 4}
	if (recipe("","wood","","","","","","","") == true) {id = "stick1"; n = 4}
	if (recipe("","","wood","","","","","","") == true) {id = "stick1"; n = 4}
	if (recipe("","","","wood","","","","","") == true) {id = "stick1"; n = 4}
	if (recipe("","","","","wood","","","","") == true) {id = "stick1"; n = 4}
	if (recipe("","","","","","wood","","","") == true) {id = "stick1"; n = 4}
	if (recipe("","","","","","","wood","","") == true) {id = "stick1"; n = 4}
	if (recipe("","","","","","","","wood","") == true) {id = "stick1"; n = 4}
	if (recipe("","","","","","","","","wood") == true) {id = "stick1"; n = 4}
	if (id != "") {ctx.drawImage(img(id),925,446,130,130)}
	if (give == true) {return {id:id, n:n}};
}
function recipe(el1,el2,el3,el4,el5,el6,el7,el8,el9) {
	if (craft[0].id == el1 && craft[1].id == el2 && craft[2].id == el3 && craft[3].id == el4 && craft[4].id == el5 && craft[5].id == el6 && craft[6].id == el7 && craft[7].id == el8 && craft[8].id == el9) {return true}
	return false
}


function action(i) {
	if (obj[i].id == "tree") {load=0;loadStep=1;lockMove=true;lockSpace=true;lockInv=true;curObj=i}
	if (obj[i].id == "bluebush" || obj[i].id == "redbush") {load=0;loadStep=5;lockMove=true;lockSpace=true;lockInv=true;curObj=i}
}
function pickup() {
	if (obj[pi()].id == "stick1" || obj[pi()].id == "stick2") {obj[pi()].id = ""; invAdd("stick1", 1)}
}

function tool(id) {
	if (id == "woodenPickaxe") {return true}
	return false;
}
function img(id) {
	let path = "img/"+id+".png";
	if (id == "W") {path = "img/playerW.png"}
	if (id == "A") {path = "img/playerA.png"}
	if (id == "S") {path = "img/playerS.png"}
	if (id == "D") {path = "img/playerD.png"}
		
	drawImg = new Image(); drawImg.src = path; return drawImg;
}
function name(id) {
	if (id == "blueberry") {return "Синяя ягода"}
	if (id == "redberry") {return "Красная ягода"}
	if (id == "wood") {return "Древесина"}
	if (id == "stone") {return "Камень"}
	if (id == "stick1") {return "Палка"}
	return "";
}
function max(id) {
	if (id == "woodenPickaxe") {return 1}
	return 64;
}
function solid(id) {
	let solid = true;
	if (id == "" || id == "stick1" || id == "stick2") {solid = false}
	return solid;
}

function go() {
	if (x < getx) {x+=0.1} else if (x > getx) {x-=0.1}; if (y < gety) {y+=0.1} else if (y > gety) {y-=0.1}
	
	if (Math.abs(x)-Math.abs(getx) < 0.1 && Math.abs(x)-Math.abs(getx) > 0) {x=getx}
	if (Math.abs(y)-Math.abs(gety) < 0.1 && Math.abs(y)-Math.abs(gety) > 0) {y=gety}

	if (x == getx && y == gety) {going=false; pickup()}
}
function msg(str1,str2,str3) {lockInv = true; lockSpace = true; lockMove = true; openMsg = true; textMsg1 = str1; textMsg2 = str2; textMsg3 = str3}