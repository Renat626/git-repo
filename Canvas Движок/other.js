function loadFunc() {
	ctx.fillStyle = "green"; ctx.fillRect(500,280,100,20); ctx.fillStyle = "lime"; ctx.fillRect(500,280,load,20); load+=loadStep;
	if (load == 100) {
		lockMove=false; lockSpace=false; lockInv=false;
		if (obj[curObj].id == "tree") {obj[curObj].id=""; invAdd("wood", 1)}
		if (obj[curObj].id == "bluebush") {obj[curObj].id="bush"; invAdd("blueberry", 1); let a=curObj; setTimeout(function(){obj[a].id="bluebush"},30000)}
		if (obj[curObj].id == "redbush") {obj[curObj].id="bush"; invAdd("redberry", 1); let a=curObj; setTimeout(function(){obj[a].id="redbush"},30000)}
		if (obj[curObj].id == "stone") {obj[curObj].id=""; invAdd("stone", 1)}
	}
}
function action(i) {
	if (obj[i].id == "tree" || obj[i].id == "bluebush" || obj[i].id == "redbush") {loadStep=itemsStep(obj[i].id); reload(i)}
	
	if (obj[i].id == "stone") {
		if (inv[hotbarN].id == "woodenPickaxe") {loadStep = 0.25; reload(i)}
		if (inv[hotbarN].id == "stonePickaxe") {loadStep = 0.5; reload(i)}
		if (inv[hotbarN].id == "ironPickaxe") {loadStep = 1; reload(i)}
		if (inv[hotbarN].id == "goldPickaxe") {loadStep = 2; reload(i)}
	}
}
function itemsStep(id) {
	if (id == "tree") {return 0.5}
	if (id == "bluebush" || id == "redbush") {return 2.5}
}
function reload(i) {load=0;lockMove=true;lockSpace=true;lockInv=true;curObj=i}


function useItem() {
	let n = -1; if (craftOpen == false && invOpen == true) {n = invN} else if (invOpen == false) {n = hotbarN}
	if (inv[n].id == "blueberry" && food+5 < 100 || inv[n].id == "redberry" && food+5 < 100) {food+=5; inv[n].n--; if (inv[n].n == 0) {inv[n].id = ""}}
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
function invQ(n) {inv[n].n--; if (inv[n].n == 0) {inv[n].id = ""}}


function craftSpace() {
	if (craftOpen == false) {
		if (invCut.id == "") {
			invCut.id = inv[invN].id; invCut.n = inv[invN].n; invCut.m = inv[invN].m;
			inv[invN].id = ""; inv[invN].n = 0; inv[invN].m = 64;
		}
		else if (inv[invN].id == invCut.id) {
			inv[invN].n++; invCut.n--; if (invCut.n == 0) {invCut.id = ""}
		}
		else if (inv[invN].id != "") {
			let asd = {id:"", n:0, m:0}; asd.id = inv[invN].id; asd.n = inv[invN].n; asd.m = inv[invN].m;
			inv[invN].id = invCut.id; inv[invN].n = invCut.n; inv[invN].m = invCut.m;
			invCut.id = asd.id; invCut.n = asd.n; invCut.m = asd.m;
		}
		else {inv[invN].id = invCut.id; inv[invN].n = invCut.n; inv[invN].m = invCut.m; invCut.id = ""}
	} else {
		if (invCut.id == "") {
			invCut.id = craft[craftN].id; invCut.n = craft[craftN].n; invCut.m = craft[craftN].m;
			craft[craftN].id = ""; craft[craftN].n = 0; craft[craftN].m = 64;
		}
		else if (craft[craftN].id == invCut.id) {
			craft[craftN].n++; invCut.n--; if (invCut.n == 0) {invCut.id = ""}
		}
		else if (craft[craftN].id != "") {
			let asd = {id:"", n:0, m:0}; asd.id = craft[craftN].id; asd.n = craft[craftN].n; asd.m = craft[craftN].m;
			craft[craftN].id = invCut.id; craft[craftN].n = invCut.n; craft[craftN].m = invCut.m;
			invCut.id = asd.id; invCut.n = asd.n; invCut.m = asd.m;
		}
		else {craft[craftN].id = invCut.id; craft[craftN].n = 1; craft[craftN].m = invCut.m; invCut.n--; if (invCut.n == 0) {invCut.id = ""}}
	}
}
function craftDo() {
	id = craftCheck(true).id; n = craftCheck(true).n;
	if (id != "") {for (let i = craft.length - 1; i >= 0; i--) {craft[i].n--; if (craft[i].n == 0) {craft[i].id = ""}}; invAdd(id, n)}
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
	if (id != "") {
		ctx.drawImage(img(id),925,446,130,130);
		ctx.fillStyle = "white"; ctx.font = "32px serif";
		if (n > 9 && n < 100) {ctx.fillText(n,1018,571)}
		else if (n != 1) {ctx.fillText(n,1035,571)}
	}
	if (give == true) {return {id:id, n:n}};
}
function recipe(el1,el2,el3,el4,el5,el6,el7,el8,el9) {
	if (craft[0].id == el1 && craft[1].id == el2 && craft[2].id == el3 && craft[3].id == el4 && craft[4].id == el5 && craft[5].id == el6 && craft[6].id == el7 && craft[7].id == el8 && craft[8].id == el9) {return true}
	return false;
}


function pickup() {
	if (obj[pi()].id == "stick1" || obj[pi()].id == "stick2") {obj[pi()].id = ""; invAdd("stick1", 1)}
}
function img(id) {for (let i = images.length - 1; i >= 0; i--) {if (images[i].id == id) {return images[i].img}}}
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
	if (x < getx) {x+=0.05} else if (x > getx) {x-=0.05}; if (y < gety) {y+=0.05} else if (y > gety) {y-=0.05}
	
	if (Math.abs(x)-Math.abs(getx) < 0.05 && Math.abs(x)-Math.abs(getx) > 0) {x=getx}
	if (Math.abs(y)-Math.abs(gety) < 0.05 && Math.abs(y)-Math.abs(gety) > 0) {y=gety}

	if (x == getx && y == gety) {going=false; pickup()}
}
function msg(str1,str2,str3) {lockInv = true; lockSpace = true; lockMove = true; openMsg = true; textMsg1 = str1; textMsg2 = str2; textMsg3 = str3}