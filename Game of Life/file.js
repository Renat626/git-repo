window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");

	ctx.fillStyle = "black"; ctx.fillRect(0,0,canv.width,canv.height);

	mx=my=0; md=false; b = []; timer = 2; maxtime = 2; goTime = false;

	for (let i = 0; i < 56; i++) {for (let i2 = 0; i2 < 36; i2++) {b.push({x:i,y:i2,l:0})}}

	setInterval(function() {game()}, 1000/60);
}

function game() {
	ctx.fillStyle = "black"; ctx.fillRect(0,0,canv.width,canv.height);

	if (goTime) {timer--}
	delb = []; newb = [];

	for (let i = 0; i < 55; i++) {
		for (let i2 = 0; i2 < 35; i2++) {
			ctx.strokeStyle = "rgb(33,33,33)"; ctx.strokeRect(i*20,i2*20,20,20);
			let id = findb(i,i2);

			if (timer == 0) {
				if (b[id].l == 0) {
					if (b[id].x != 0 && b[id].x != 54 && b[id].y != 0 && b[id].y != 34) {
						if (findn(id) == 3) {newb.push(id)}
					}
				}
		
				if (b[id].l == 1) {
					if (b[id].x == 0 || b[id].x == 54 || b[id].y == 0 || b[id].y == 34) {delb.push(id)} else {
						let n = findn(id); if (n < 2 || n > 3) {delb.push(id)}
					}
				}				
			}

			if (b[id].l == 1) {ctx.fillStyle = "white"; ctx.fillRect(i*20,i2*20,20,20)}

			if (mx > i*20 && mx < i*20+20 && my > i2*20 && my < i2*20+20 && md == true) {
				md = false; if (b[id].l == 0) {b[id].l = 1} else {b[id].l = 0}
			}
		}
	}

	if (timer == 0) {
		timer = maxtime;
		for (let i = delb.length - 1; i >= 0; i--) {b[delb[i]].l = 0}
		for (let i = newb.length - 1; i >= 0; i--) {b[newb[i]].l = 1}
	}
}

onmousemove = function(e) {
	mx = parseInt(e.pageX / (window.innerWidth / 1100)); my = parseInt(e.pageY / (window.innerHeight / 700));
}

onmousedown = function(e) {md=true}
onmouseup = function(e) {md=false}

function findb(x,y) {for (let i = b.length - 1; i >= 0; i--) {if (b[i].x == x && b[i].y == y) {return i}}}

function findn(id) {
	let n = 0;
	if (b[id-1].l == 1) {n++}
	if (b[id-35].l == 1) {n++}
	if (b[id-36].l == 1) {n++}
	if (b[id-37].l == 1) {n++}
	if (b[id+1].l == 1) {n++}
	if (b[id+35].l == 1) {n++}
	if (b[id+36].l == 1) {n++}
	if (b[id+37].l == 1) {n++}
	return n;
}

onkeydown = function(e) {
	if (e.which == 32) {if (goTime) {goTime = false} else {goTime = true}}
	if (e.which == 90) {if (maxtime > 1) {maxtime--; time = maxtime}}
	if (e.which == 88) {maxtime++; time = maxtime}
	if (e.which == 67) {for (let i = b.length - 1; i >= 0; i--) {b[i].l = 0}}
	if (e.which == 50) {
		map = [1373,1372,1337,1336,980,979,975,974,907,903,870,869,868,834,833,832,727,692,691,690,657,653,619,586,580,550,544,513,509,476,475,474,151,150,115,114];
		for (let i = map.length - 1; i >= 0; i--) {b[map[i]].l = 1}
	}
	if (e.which == 57) {
		map = []; for (let i = b.length - 1; i >= 0; i--) {if (b[i].l == 1) {map.push(i)}}
		console.log(map);
	}
}