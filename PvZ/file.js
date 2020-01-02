window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");

	ctx.fillStyle = "black"; ctx.fillRect(0,0,canv.width,canv.height);

	mx=my=100; md = false; sun = 25; sunFall = 160; zombiePush = 1600; maxZombiePush = 1000; minZombiePush = 25; hash = {id:"",cost:0};

	plants = []; zombies = []; suns = []; bullets = []; dead = []; images = [];

	preload();

	setInterval(function() {game()}, 1000/60);
}

function game() {

	////////// ПОЛЕ //////////

	let bool = true;
	for (let i2 = 0; i2 < 6; i2++) {
		for (let i = 0; i < 11; i++) {
			if (i != 10) {
				if (bool) {ctx.fillStyle = "rgb(0,177,0)"; ctx.fillRect(i*100,i2*100+75,100,100); bool = false}
				else {ctx.fillStyle = "rgb(0,225,0)"; ctx.fillRect(i*100,i2*100+75,100,100); bool = true}
				if (mx > i*100 && mx < i*100+100 && my > i2*100+75 && my < i2*100+175 && hash.id != "") {
					if (hasPlant(i*100,i2*100+75) == false) {
						ctx.drawImage(imgLoad(hash.id),i*100,i2*100+75,100,100);
						if (md) {
							if (hash.id == "shovel") {hash.id = ""}
							if (hash.id == "sunflower2") {
								plants.push({id:"sunflower",x:i*100,y:i2*100+75,animId:"sunflower2",step:1,n:0,max:50,hp:180,give:520});
								sun-=50; hash.id = "";
							}
							if (hash.id == "goroh2") {
								plants.push({id:"goroh",x:i*100,y:i2*100+75,animId:"goroh2",step:1,n:0,max:50,hp:300,reload:65});
								sun-=100; hash.id = "";
							}
						}
					} else if (md) {if (hash.id == "shovel") {
						for (let i3 = plants.length - 1; i3 >= 0; i3--) {if (plants[i3].x == i*100 && plants[i3].y == i2*100+75) {plants.splice(i3,1)}}
					}; hash.id = ""}
				}
			} else {if (bool) {bool = false} else {bool = true}}
		}
	}

	////////// РАСТЕНИЯ //////////

	for (let i = plants.length - 1; i >= 0; i--) {
		if (plants[i].id != "") {
			ctx.drawImage(imgLoad(plants[i].animId),plants[i].x,plants[i].y,100,100);
			plants[i].n++;

			if (plants[i].id == "sunflower") {plants[i].give--; if (plants[i].give == 0) {plants[i].give = rand(350)+700; suns.push({x:plants[i].x+13,y:plants[i].y-13,fall:false})}}
			if (plants[i].id == "goroh") {
				if (plants[i].reload > 0) {plants[i].reload--}
				for (let i2 = zombies.length - 1; i2 >= 0; i2--) {
					if (plants[i].y == zombies[i2].y && plants[i].x+40 < zombies[i2].x && plants[i].x+700 > zombies[i2].x && plants[i].reload == 0) {
						plants[i].reload = 210; bullets.push({x:plants[i].x+40,y:plants[i].y-20});
					}
				}
			}

			if (plants[i].n == plants[i].max) {
				plants[i].n = 0; 
				plants[i].animId = nextAnim(plants[i].id, plants[i].step).id;
				plants[i].step = nextAnim(plants[i].id, plants[i].step).step;
			}
			if (plants[i].hp <= 0) {plants.splice(i,1)}
		}
	}

	////////// ТРУПЫ //////////

	for (let i = dead.length - 1; i >= 0; i--) {
		ctx.drawImage(imgLoad("simpleZombieDead"),dead[i].x,dead[i].y+40,100,100);
		dead[i].hp--; if (dead[i].hp == 0) {dead.splice(i,1)}
	}

	////////// ЗОМБИ //////////

	zombiePush--; if (zombiePush == 0) {
		zombies.push({id:"simpleZombie",x:1005,y:rand(6)*100+75,animId:"simpleZombie1",step:1,n:0,max:100,hp:5});
		zombiePush = maxZombiePush; minZombiePush+5; if (maxZombiePush - minZombiePush > 5) {maxZombiePush-=minZombiePush} else {maxZombiePush = 25}
	}
	for (let i = zombies.length - 1; i >= 0; i--) {
		let go = true, ip = false;
		for (let i2 = plants.length - 1; i2 >= 0; i2--) {
			if (zombies[i].x > plants[i2].x && zombies[i].x < plants[i2].x+50 && zombies[i].y == plants[i2].y) {go = false; ip = i2}
		}
		if (go) {zombies[i].x-=zombies[i].n/120} else {plants[ip].hp--}
		ctx.drawImage(imgLoad(zombies[i].animId),zombies[i].x,zombies[i].y,100,100);
		zombies[i].n++;
		if (zombies[i].n == zombies[i].max) {
			zombies[i].n = 30; if (go == false) {zombies[i].n = zombies[i].max-8}
			zombies[i].animId = nextAnim(zombies[i].id, zombies[i].step).id;
			zombies[i].step = nextAnim(zombies[i].id, zombies[i].step).step;
		}	
		if (zombies[i].x < -105) {zombies.splice(i,1); document.location.reload(true)}
	}

	////////// ПУЛИ //////////

	for (let i = bullets.length - 1; i >= 0; i--) {
		let bulletDel = false; bullets[i].x+=3.5; if (bullets[i].x > 1005) {bulletDel = true}
		ctx.drawImage(imgLoad("gorohBullet"),bullets[i].x,bullets[i].y,100,100);
		for (let i2 = zombies.length - 1; i2 >= 0; i2--) {
			if (bullets[i].x > zombies[i2].x && bullets[i].x < zombies[i2].x+100 && bullets[i].y+20 == zombies[i2].y) {
				bulletDel = true; zombies[i2].hp--; if (zombies[i2].hp == 0) {dead.push({x:zombies[i2].x,y:zombies[i2].y,hp:300}); zombies.splice(i2,1)}
			}
		}
		if (bulletDel) {bullets.splice(i,1)}
	}

	////////// СОЛНЦА //////////

	sunFall--; if (sunFall == 0) {suns.push({x:rand(925),y:0,fall:true}); sunFall = 500}
	for (let i = suns.length - 1; i >= 0; i--) {
		let sunDel = false; if (suns[i].fall) {suns[i].y+=0.5; if (suns[i].y > 680) {sunDel = true}}
		ctx.drawImage(imgLoad("sun"),suns[i].x,suns[i].y,75,75);
		if (mx > suns[i].x && mx < suns[i].x+75 && my > suns[i].y && my < suns[i].y+75) {sunDel = true; sun+=25}
		if (sunDel) {suns.splice(i,1)}
	}

	////////// ПАНЕЛЬ ПОКУПОК //////////

	ctx.fillStyle = "rgb(190,190,100)"; ctx.fillRect(0,0,canv.width,75);
	for (let i = 0; i < 2; i++) {
		if (mx > i*75+100 && mx < i*75+175 && my > 0 && my < 75) {
			ctx.fillStyle = "rgb(210,210,110)"; ctx.fillRect(i*75+100,0,75,75);
			if (md) {
				md = false;
				if (i == 0 && sun >= 50) {if (hash.id != "sunflower2") {hash.id = "sunflower2"; hash.cost = 50} else {hash.id = ""}}
				if (i == 1 && sun >= 100) {if (hash.id != "goroh2") {hash.id = "goroh2"; hash.cost = 100} else {hash.id = ""}}
			} 
		}
		ctx.strokeStyle = "silver"; ctx.strokeRect(i*75+100,0,75,75); ctx.strokeRect(i*75+101,1,75,75);
	}
	if (mx > 925 && mx < 1000 && my > 0 && my < 75) {
		ctx.fillStyle = "rgb(210,210,110)"; ctx.fillRect(925,0,75,75); 
		if (md) {md = false; if (hash.id != "shovel") {hash.id = "shovel"} else {hash.id = ""}}
	}
	ctx.strokeStyle = "silver"; ctx.strokeRect(925,0,75,75); ctx.strokeRect(926,1,75,75);
	ctx.drawImage(imgLoad("shovel"),925,0,75,75);

	ctx.font = "24px serif"; ctx.fillStyle = "white";
	ctx.drawImage(imgLoad("sunflower2"),100,3,75,75); ctx.fillText("50",150,73);
	ctx.drawImage(imgLoad("goroh2"),175,-1,75,75); ctx.fillText("100",213,73);

	ctx.font = "42px serif"; ctx.fillStyle = "white"; if (sun < 10) {ctx.fillText(sun,39,52)};
	if (sun >= 10 && sun < 100) {ctx.fillText(sun,29,52)}; if (sun >= 100 && sun < 1000) {ctx.fillText(sun,19,52)}
	if (sun >= 1000 && sun < 10000) {ctx.fillText(sun,9,52)}; if (sun >= 10000) {ctx.fillText(sun,9,52,81)}

	////////////////////////////////////
}



function preload() {
	idList = ["goroh1","goroh2","goroh3","gorohBullet","sunflower1","sunflower2","sunflower3","sun",
	"simpleZombie1","simpleZombie2","simpleZombieDead","shovel"];
	for (let i = idList.length - 1; i >= 0; i--) {
		img = new Image(); img.src = "img/"+idList[i]+".png"; images.push({id:idList[i],img:img});
	}
}

function nextAnim(id, step) {
	if (id == "goroh") {
		if (step == 1) {return {id:"goroh3",step:2}}; if (step == 2) {return {id:"goroh2",step:3}}
		if (step == 3) {return {id:"goroh1",step:4}}; if (step == 4) {return {id:"goroh2",step:1}}
	}
	if (id == "sunflower") {
		if (step == 1) {return {id:"sunflower3",step:2}}; if (step == 2) {return {id:"sunflower2",step:3}}
		if (step == 3) {return {id:"sunflower1",step:4}}; if (step == 4) {return {id:"sunflower2",step:1}}
	}
	if (id == "simpleZombie") {
		if (step == 1) {return {id:"simpleZombie2",step:2}}; if (step == 2) {return {id:"simpleZombie1",step:1}}
	}
}

function hasPlant(x,y) {for (let i = plants.length - 1; i >= 0; i--) {if (plants[i].x == x && plants[i].y == y) {return true}}; return false}
function imgLoad(id) {for (let i = images.length - 1; i >= 0; i--) {if (images[i].id == id) {return images[i].img}}}
onmousemove = function(e) {let x = e.pageX, y = e.pageY; mx = parseInt(x / (window.innerWidth / 1001)); my = parseInt(y / (window.innerHeight / 676))}
onmousedown = function() {md = true}; onmouseup = function() {md = false}; function rand(i) {return parseInt(Math.random() * i)}