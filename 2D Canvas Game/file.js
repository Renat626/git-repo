window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");

	velx=vely=0;g=0.15;onGround = false;
	keyW=keyA=keyS=keyD=keySpace=false;
	x=y=290; w=h=20;

	obj=[{x:200,y:540,w:30,h:30,color:"white",sl:false,sr:false,st:false,sb:false},
	     {x:300,y:570,w:10,h:30,color:"white",sl:false,sr:false,st:false,sb:false},
	     {x:400,y:540,w:30,h:30,color:"white",sl:false,sr:false,st:false,sb:false},
	     {x:350,y:480,w:80,h:30,color:"white",sl:false,sr:false,st:false,sb:false}
	    ];

	ctx.fillStyle = "black"; // ОТРИСОВКА ПОЛЯ ИГРЫ
	ctx.fillRect(0,0,canv.width,canv.height);

	setInterval(function() {game()}, 1000/60);	
}

function game() {
	ctx.fillStyle = "black"; // ОТРИСОВКА ПОЛЯ ИГРЫ
	ctx.fillRect(0,0,canv.width,canv.height);

	let resultGround = false;

	for (let i = 0; i < obj.length; i++) {
		obj[i].sl=false;obj[i].sr=false;obj[i].st=false;obj[i].sb=false;
		if (x <= (obj[i].x - w)) {obj[i].sl = true}
		if (x >= (obj[i].x + obj[i].w)) {obj[i].sr = true}
		if (y <= (obj[i].y - h)) {obj[i].st = true}
		if (y >= (obj[i].y + obj[i].h)) {obj[i].sb = true}
	}

	if (keyW) {if (onGround == true) {vely-= 5; resultGround = false}}
	if (keyA) {if (velx > -3.7) {velx-=0.3}}
	if (keyS) {}
	if (keyD) {if (velx < 3.7) {velx+=0.3}}

	if (onGround == false) {vely+=g}

	if (velx < 0) {velx+=0.1} else if (velx > 0) {velx-=0.1}
	if (velx < 0.1 && velx > 0 || velx > -0.1 && velx < 0) {velx = 0}

	for (let i = 0; i < obj.length; i++) {obj[i].x-=velx; obj[i].y-=vely}

	for (let i = 0; i < obj.length; i++) {
		if (y <= obj[i].y && y+h >= obj[i].y+obj[i].h) {
			if (x+w > obj[i].x && x+w < obj[i].x+obj[i].w) {let razn = obj[i].x - (x+w);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].x-=razn}; velx=0}
			if (x < obj[i].x+obj[i].w && x > obj[i].x) {let razn = obj[i].x - (x-obj[i].w);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].x-=razn}; velx=0}
		}
		if (x <= obj[i].x && x+w >= obj[i].x+obj[i].w) {
			if (y+h > obj[i].y && y+h < obj[i].y+obj[i].h) {let razn = obj[i].y - (y+h);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].y-=razn}; vely=0; resultGround = true}
			if (y < obj[i].y+obj[i].h && y > obj[i].y) {let razn = obj[i].y - (y-obj[i].h);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].y-=razn}; vely=0}
		}

		if (x+w > obj[i].x && x+w < obj[i].x+obj[i].w || x < obj[i].x+obj[i].w && x > obj[i].x) {
			if (y+h > obj[i].y && y+h < obj[i].y+obj[i].h || y < obj[i].y+obj[i].h && y > obj[i].y) {
				if (obj[i].sl == true) {
					let razn = obj[i].x - (x+w);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].x-=razn}; velx=0;
				}
				if (obj[i].sr == true) {
					let razn = obj[i].x - (x-obj[i].w);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].x-=razn}; velx=0;
				}
				if (obj[i].st == true) {
					let razn = obj[i].y - (y+h);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].y-=razn}; vely=0; resultGround = true;
				}
				if (obj[i].sb == true) {
					let razn = obj[i].y - (y-obj[i].h);for (let i2 = 0; i2 < obj.length; i2++) {obj[i2].y-=razn}; vely=0;
				}
			}
		}
	}

	for (let i = 0; i < obj.length; i++) {
		ctx.fillStyle = obj[i].color;
		ctx.fillRect(obj[i].x, obj[i].y, obj[i].w, obj[i].h);
	}

	onGround = resultGround;

	ctx.fillStyle = "royalblue";
	ctx.fillRect(x, y, w, h);

	//ctx.font = "30px serif";
	//ctx.fillText("y1="+obj[0].y, 350, 30);
}

onkeydown = function(e) {
	if (e.which == 81) { // Q
		
	}
	if (e.which == 69) { // E
		
	}

	if (e.which == 87) {keyW=true} // W
	if (e.which == 65) {keyA=true} // A
	if (e.which == 83) {keyS=true} // S
	if (e.which == 68) {keyD=true} // D

	if (e.which == 32) {keySpace=true} // SPACE
}

onkeyup = function(e) {
	if (e.which == 87) {keyW=false} // W
	if (e.which == 65) {keyA=false} // A
	if (e.which == 83) {keyS=false} // S
	if (e.which == 68) {keyD=false} // D

	if (e.which == 32) {keySpace=false} // SPACE
}

onmousedown = function(e) {
	if (e.target.type == "submit") {
		if (e.target.id == "buttonG") {
			g = Number(inputG.value);
		}
	}
}