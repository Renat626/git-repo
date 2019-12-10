window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d"); // 11 X 7

	mapWidth = 20; mapHeight = 20;

	keyw=keya=keys=keyd=keye=keyq=keyf=keyr=key1=key2=key3=key4=key5=key6=key7=key8=key9=key0=space=going=lockMove=lockSpace=lockInv=invOpen=openMsg=craftOpen=false;
	x=y=getx=gety=invN=craftN=invRel=hotbarN=loadStep=0; load=food=health=100; textMsg1=textMsg2=textMsg3="";
	side = "playerS"; curObj = {}; invCut = {id:"", n:0, m:0}; obj=[]; inv=[]; craft=[]; images=[]; toolN = -1;
	for (let i = 30; i >= 0; i--) {inv.push({id:"", n:1, m:64})}; for (let i = 8; i >= 0; i--) {craft.push({id:"", n:1, m:0})}

	preload();
	generation();
	draw();

	setInterval(function() {game()}, 1000/60);
}

function preload() {
	let id = ""; 
	for (let i = 0; i < 36; i++) {
		if (i == 0) {id = "grass"}; if (i == 1) {id = "tree"}; if (i == 2) {id = "bluebush"}
		if (i == 3) {id = "redbush"}; if (i == 4) {id = "stone"}; if (i == 5) {id = "bush"}
		if (i == 6) {id = "playerW"}; if (i == 7) {id = "playerA"}; if (i == 8) {id = "playerS"}
		if (i == 9) {id = "playerD"}; if (i == 10) {id = "blueberry"}; if (i == 11) {id = "redberry"}
		if (i == 12) {id = "stick1"}; if (i == 13) {id = "stick2"}; if (i == 14) {id = "wood"}
		if (i == 15) {id = "woodenPickaxe"}; if (i == 16) {id = "woodenAxe"}; if (i == 17) {id = "caveHole"}
		if (i == 18) {id = "caveUp"}; if (i == 19) {id = "coal"}; if (i == 20) {id = "coalOre"}
		if (i == 21) {id = "food"}; if (i == 22) {id = "heart"}; if (i == 23) {id = "darkFood"}
		if (i == 24) {id = "darkHeart"}; if (i == 25) {id = "error"}; if (i == 26) {id = "furnaceOn"}
		if (i == 27) {id = "furnaceOff"}; if (i == 28) {id = "halfFood"}; if (i == 29) {id = "halfHeart"}
		if (i == 30) {id = "stonePickaxe"}; if (i == 31) {id = "ironPickaxe"}; if (i == 32) {id = "goldPickaxe"}
		if (i == 33) {id = "stoneAxe"}; if (i == 34) {id = "ironAxe"}; if (i == 35) {id = "goldAxe"};
		drawImg = new Image(); drawImg.src = "img/"+id+".png"; images.push({id:id, img:drawImg});
	}
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
	if (e.which == 48) {key0=true}
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
	if (e.which == 48) {key0=false}
}