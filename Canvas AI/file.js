let h = [{id:1,x:0,y:0,p:1,tx:0,ty:0,tid:0,wood:0,hx:0,hy:0}];
let t = [{id:1,x:10,y:10,c:false},{id:2,x:20,y:20,c:false},{id:3,x:15,y:30,c:false}];
let hs = [];
let valueh = 1, valuet = 3;

window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d"); gs = 5; gx = 0; gy = 0;
	setInterval(function() {game()}, 1000/20);
}

onkeydown = function(e) {
	if (e.which == 81) {gs-=1} // Q
	if (e.which == 69) {gs+=1} // E

	if (e.which == 87) {gy+=30/gs} // W
	if (e.which == 65) {gx+=30/gs} // A
	if (e.which == 83) {gy-=30/gs} // S
	if (e.which == 68) {gx-=30/gs} // D

	if (e.which == 32) {gx = 0; gy = 0; gs = 5} // SPACE
}

function game() {
	ctx.fillStyle = "black"; // ОТРИСОВКА ПОЛЯ ИГРЫ
	ctx.fillRect(0,0,canv.width,canv.height);

	for (i = 0; i < t.length; i++) { // ОТРИСОВКА ДЕРЕВЬЕВ
		ctx.fillStyle = "lime";
		ctx.fillRect((t[i].x+gx)*gs,(t[i].y+gy)*gs,gs-2,gs-2);
	}

	for (i = 0; i < h.length; i++) {

		if (h[i].p == 8) { // УБИЙСТВО И СУИЦИД
			let wrong = true;
			for (i2 = 0; i2 < h.length; i2++) {
				if (h[i2].id == h[i].wood) {
					wrong = false;
					if (h[i].x == h[i2].x && h[i].y == h[i2].y) {
						if (h[i2].p == 2) {for (i3 = 0; i3 < t.length; i3++) {if (t[i3].id == h[i2].tid) {t[i3].c = false}}}
						h.splice(i2,1); h.splice(i,1); 
					} else {
						if (h[i].x > h[i2].x) {h[i].x--} else if (h[i].x < h[i2].x) {h[i].x++}
						if (h[i].y > h[i2].y) {h[i].y--} else if (h[i].y < h[i2].y) {h[i].y++}
					}
				}
			}
			if (wrong == true) {h[i].p = 7}
		}

		if (h[i].p == 7) { // ПОИСК КОГО УБИТЬ
			for (i2 = 0; i2 < h.length; i2++) {if (h[i].id != h[i2].id) {h[i].wood = h[i2].id; h[i].p = 8}}
		}

		if (h[i].p == 6) { // ПОСАДКА ДЕРЕВА
			if (h[i].x == h[i].tx && h[i].y == h[i].ty) {
				valuet++; t.push({id:valuet,x:h[i].tx,y:h[i].ty,c:false}); h[i].wood--;
				if (h[i].wood == 0) {h[i].p = 7} else {h[i].p = 5}
			} else {
				if (h[i].x > h[i].tx) {h[i].x--} else if (h[i].x < h[i].tx) {h[i].x++}
				if (h[i].y > h[i].ty) {h[i].y--} else if (h[i].y < h[i].ty) {h[i].y++}
			}
		}

		if (h[i].p == 5) { // ПОИСК МЕСТА ДЛЯ ПОСАДКИ ДЕРЕВА
			h[i].tx = parseInt(Math.random() * 109) + 5; h[i].ty = parseInt(Math.random() * 109) + 5; h[i].p = 6;
		}

		if (h[i].p == 4) { // СТРОИТЕЛЬСТВО ДОМА
			if (h[i].x == h[i].hx && h[i].y == h[i].hy) {
				hs.push({x:h[i].hx,y:h[i].hy}); h[i].p = 5; h[i].wood = 6;
				valueh++; h.push({id:valueh,x:h[i].x,y:h[i].y,p:1,tx:0,ty:0,tid:0,wood:0,hx:0,hy:0});
				valueh++; h.push({id:valueh,x:h[i].x,y:h[i].y,p:1,tx:0,ty:0,tid:0,wood:0,hx:0,hy:0});
				setTimeout(function() {hs.splice(0,1)}, 10000);
			} else {
				if (h[i].x > h[i].hx) {h[i].x--} else if (h[i].x < h[i].hx) {h[i].x++}
				if (h[i].y > h[i].hy) {h[i].y--} else if (h[i].y < h[i].hy) {h[i].y++}
			}
		}

		if (h[i].p == 3) { // ПОИСК МЕСТА ДЛЯ ПОСТРОЙКИ ДОМА
			h[i].hx = parseInt(Math.random() * 109) + 5; h[i].hy = parseInt(Math.random() * 109) + 5; h[i].p = 4;
		}

		if (h[i].p == 2) { // РУБКА ДЕРЕВА
			if (h[i].x == h[i].tx && h[i].y == h[i].ty) {
				for (i2 = 0; i2 < t.length; i2++) {
				 	if (t[i2].id == h[i].tid) {
				 		h[i].wood++; t.splice(i2,1); if (h[i].wood == 3) {h[i].p = 3} else {h[i].p = 1}
				 	}
				 }
			} else {
				if (h[i].x > h[i].tx) {h[i].x--} else if (h[i].x < h[i].tx) {h[i].x++}
				if (h[i].y > h[i].ty) {h[i].y--} else if (h[i].y < h[i].ty) {h[i].y++}
			}
		}

		if (h[i].p == 1) { // ПОИСК ДЕРЕВА
			for (i2 = 0; i2 < t.length; i2++) {
				if (t[i2].c == false) {
					h[i].p = 2; t[i2].c = true; h[i].tid = t[i2].id; h[i].tx = t[i2].x; h[i].ty = t[i2].y; break;
				}
			}
		}

		ctx.fillStyle = "royalblue"; // ОТРИСОВКА ЛЮДЕЙ
		if (h[i].p > 6) {ctx.fillStyle = "red"}
		ctx.fillRect((h[i].x+gx)*gs,(h[i].y+gy)*gs,gs-2,gs-2);
	}

	for (i = 0; i < hs.length; i++) { // ОТРИСОВКА ДОМОВ
		ctx.fillStyle = "brown";
		ctx.fillRect((hs[i].x+gx)*gs-1,(hs[i].y+gy)*gs-1,gs+2,gs+2);
	}
}