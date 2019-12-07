window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d"); // 11 X 7

	mapWidth = 20; mapHeight = 20;

	keyw=keya=keys=keyd=keye=keyq=keyf=keyr=key1=key2=key3=key4=key5=key6=key7=key8=key9=space=going=lockMove=lockSpace=lockInv=openInv=openMsg=craftOpen=false;
	x=y=getx=gety=mx=my=invN=craftN=invRel=0; load = 100; loadStep = 1; textMsg1=textMsg2=textMsg3="";
	side = "S"; curObj = {}; obj=[]; inv=[]; craft=[]; toolN = -1;
	for (let i = 30; i >= 0; i--) {inv.push({id:"", n:0, m:64})}; for (let i = 8; i >= 0; i--) {craft.push({id:"", n:0})}

	generation();
	draw();

	setInterval(function() {game()}, 1000/30);
}

function generation() {
	let i2 = 0;
	for (let i = 0; i <= mapWidth; i++) {
		let itemId = "";

		if (parseInt(Math.random() * 8) == 1) {itemId = "tree"}
		if (parseInt(Math.random() * 50) == 1) {itemId = "stone"}
		if (parseInt(Math.random() * 50) == 1) {itemId = "stick1"}
		if (parseInt(Math.random() * 50) == 1) {itemId = "stick2"}
		if (parseInt(Math.random() * 100) == 1) {itemId = "bluebush"}
		if (parseInt(Math.random() * 100) == 1) {itemId = "redbush"}

		obj.push({x:i,y:i2,id:itemId});

		if (pi()-mapWidth == obj.length-1 || pi()+mapWidth == obj.length-1) {obj[obj.length-1].id = ""}
		if (pi()-1 == obj.length-1 || pi()+1 == obj.length-1 || pi() == obj.length-1) {obj[obj.length-1].id = ""}

		if (i == mapWidth-1 && i2 < mapHeight-1) {i=-1; i2++}
		if (i == mapWidth-1 && i2 == mapHeight-1) {i = mapWidth+1}
	}
}

function game() {
	math();
	draw();
}

function pi() {return ((parseInt(x)+5)+(parseInt(y)+3)*mapWidth)}

onkeydown = function(e) {
	if (e.which == 87) {keyw=true}
	if (e.which == 65) {keya=true}
	if (e.which == 83) {keys=true}
	if (e.which == 68) {keyd=true}
	if (e.which == 69) {keye=true}
	if (e.which == 81) {keyq=true}
	if (e.which == 70) {keyf=true}
	if (e.which == 82) {keyr=true}
	if (e.which == 32) {space=true}

	if (e.which == 49) {key1=true}
	if (e.which == 50) {key2=true}
	if (e.which == 51) {key3=true}
	if (e.which == 52) {key4=true}
	if (e.which == 53) {key5=true}
	if (e.which == 54) {key6=true}
	if (e.which == 55) {key7=true}
	if (e.which == 56) {key8=true}
	if (e.which == 57) {key9=true}
}

onkeyup = function(e) {
	if (e.which == 87) {keyw=false}
	if (e.which == 65) {keya=false}
	if (e.which == 83) {keys=false}
	if (e.which == 68) {keyd=false}
	if (e.which == 69) {keye=false}
	if (e.which == 81) {keyq=false}
	if (e.which == 70) {keyf=false}
	if (e.which == 82) {keyr=false}
	if (e.which == 32) {space=false}

	if (e.which == 49) {key1=false}
	if (e.which == 50) {key2=false}
	if (e.which == 51) {key3=false}
	if (e.which == 52) {key4=false}
	if (e.which == 53) {key5=false}
	if (e.which == 54) {key6=false}
	if (e.which == 55) {key7=false}
	if (e.which == 56) {key8=false}
	if (e.which == 57) {key9=false}
}