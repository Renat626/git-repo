window.onload = function() {
	canv = document.getElementById("gc"); ctx = canv.getContext("2d"); canv.style.cursor = "none"; // 13 x 9

	keyw=keya=keys=keyd=keye=keyq=keyf=keyr=key1=key2=key3=key4=key5=key6=key7=key8=key9=key0=space=shift=md=go=lock=openInv=false;
	mx=my=px=py=wx=wy=world=wx=wy=0; load=food=health=100; side=8; loadStep=hotbar=1; mapWidth=mapHeight=100; speed=5;

	invTar={id:0,n:0,max:0}; obj=[];img=[];inv=[]; generation(); preload(); for (let i=0;i<40;i++) {inv.push({id:0,n:0,max:0})};

	inv[0]={id:10,n:5,max:64}; inv[1]={id:10,n:52,max:64}; inv[2]={id:10,n:11,max:64}; inv[3]={id:23,n:28,max:64};

	setInterval(function() {game()}, 1000/60);
}
function controls() {
	if (keyw == true && go == false && lock == false) {side=6; if (shift == false && solid() == false && wy != 0) {go=true}}
	if (keya == true && go == false && lock == false) {side=7; if (shift == false && solid() == false && wx != 0) {go=true}}
	if (keys == true && go == false && lock == false) {side=8; if (shift == false && solid() == false && wy != mapHeight-1) {go=true}}
	if (keyd == true && go == false && lock == false) {side=9; if (shift == false && solid() == false && wx != mapWidth-1) {go=true}}
	if (go) {if (side == 6) {py-=speed}; if (py<=-100) {py=0;wy--;go=false};if (side == 7) {px-=speed}; if (px<=-100) {px=0;wx--;go=false};if (side == 8) {py+=speed}; if (py>=100) {py=0;wy++;go=false};if (side == 9) {px+=speed};if (px>=100) {px=0;wx++;go=false}}
	if (space == true && go == false && lock == false) {interact()}
	if (keye == true && go == false && lock == false || keye == true && openInv == true) {if (openInv) {openInv = false; lock = false; canv.style.cursor = "none"} else {openInv = true; lock = true; canv.style.cursor = ""}; keye = false}
	if(key1){hotbar=1};if(key2){hotbar=2};if(key3){hotbar=3};if(key4){hotbar=4};if(key5){hotbar=5};if(key6){hotbar=6};if(key7){hotbar=7};if(key8){hotbar=8};if(key9){hotbar=9};if(key0){hotbar=10};

	if (md == true && go == false && lock == false) {md = false}
}
function draw() {
	ctx.fillStyle = "royalblue"; ctx.fillRect(0,0,1100,700); let x=-1,y=-1; for (let i=0;i<117;i++) {if (x+wx>4 && x+wx<mapWidth+5 && y+wy>2 && y+wy<mapHeight+3) {ctx.drawImage(img[0],x*100-px,y*100-py,100,100); ctx.drawImage(img[obj[x-5+wx+(y-3+wy)*mapWidth]],x*100-px,y*100-py,100,100)}; x++; if (x>11) {x=-1;y++}}
	
	ctx.drawImage(img[side],500,300,100,100); if (load < 100) {ctx.fillStyle = "green"; ctx.fillRect(500,278,100,20); ctx.fillStyle = "lime"; ctx.fillRect(500,278,load,20); load+=loadStep; if (load >= 100) {loadEnd()}}

	drawHotbar(); if (openInv) {inventory()}
}
function drawHotbar() {
	for (let i=0;i<10;i++) {ctx.fillStyle="#bbbd";ctx.fillRect(255+60*i,640,50,50);ctx.strokeStyle="#333d";if (hotbar==i+1) {ctx.strokeStyle="#fffd"}; ctx.strokeRect(255+60*i,640,50,50)}
	x=0; for (let i=30;i<40;i++) {
		if (inv[i].id > 0) {
			ctx.drawImage(img[inv[i].id],255+x*60,640.44,50,50);
			if (inv[i].n > 1) {ctx.fillStyle="#fff";ctx.strokeStyle="#0005";ctx.font="20px serif";if (inv[i].n<10) {ctx.strokeText(inv[i].n,294+x*60,689.44)};if (inv[i].n>9 && inv[i].n<100) {ctx.strokeText(inv[i].n,286+x*60,689.44)};if (inv[i].n>99 && inv[i].n<1000) {ctx.strokeText(inv[i].n,276+x*60,689.44)};if (inv[i].n<10) {ctx.fillText(inv[i].n,293+x*60,688.44)};if (inv[i].n>9 && inv[i].n<100) {ctx.fillText(inv[i].n,285+x*60,688.44)};if (inv[i].n>99 && inv[i].n<1000) {ctx.fillText(inv[i].n,275+x*60,688.44)};}
		};x++;
	}
	for (let i=0;i<10;i++) {ctx.drawImage(img[37],255+i*29,605,25,25)}
	for (let i=0;i<10;i++) {ctx.drawImage(img[34],555+i*29,605,25,25)}

	if (inv[29+hotbar].id>0) {
		ctx.fillStyle="#fff";ctx.strokeStyle="#0005";ctx.font="20px serif";
		let textName=getName(inv[29+hotbar].id);let textLeft=550-(ctx.measureText(textName).width/2);
		ctx.strokeText(textName,textLeft,594);ctx.fillText(textName,textLeft,593);
	}
}
function inventory() {
	ctx.fillStyle = "#999c"; ctx.fillRect(240,70,620,500); ctx.drawImage(img[8],200,73,230,275);
	ctx.fillStyle = "#bbbd"; ctx.fillRect(505,115,100,100); ctx.fillRect(505,225,100,100); ctx.fillRect(615,115,100,100); ctx.fillRect(615,225,100,100); ctx.fillRect(740,170,100,100); ctx.fillRect(395,105,50,50); ctx.fillRect(395,165,50,50); ctx.fillRect(395,225,50,50); ctx.fillRect(395,285,50,50);
	ctx.strokeStyle = "#333d"; ctx.strokeRect(505,115,100,100); ctx.strokeRect(505,225,100,100); ctx.strokeRect(615,115,100,100); ctx.strokeRect(615,225,100,100); ctx.strokeRect(740,170,100,100); ctx.strokeRect(395,105,50,50); ctx.strokeRect(395,165,50,50); ctx.strokeRect(395,225,50,50); ctx.strokeRect(395,285,50,50);
	
	for (let i2=0;i2<3;i2++) {for (let i=0;i<10;i++) {ctx.fillStyle="#bbbd";ctx.fillRect(255+60*i,390+60*i2,50,50);ctx.strokeStyle="#333d";ctx.strokeRect(255+60*i,390+60*i2,50,50)}}

	let x=0,y=0;for (let i=0;i<inv.length-10;i++) {
		if (inv[i].id > 0) {
			ctx.drawImage(img[inv[i].id],255+x*60,390+y*60,50,50);
			if (inv[i].n > 1) {ctx.fillStyle="#fff";ctx.strokeStyle="#0005";ctx.font="20px serif";if (inv[i].n<10) {ctx.strokeText(inv[i].n,294+x*60,439+y*60);ctx.fillText(inv[i].n,293+x*60,438+y*60)};if (inv[i].n>9 && inv[i].n<100) {ctx.strokeText(inv[i].n,286+x*60,439+y*60);ctx.fillText(inv[i].n,285+x*60,438+y*60)};if (inv[i].n>99 && inv[i].n<1000) {ctx.strokeText(inv[i].n,276+x*60,439+y*60);ctx.fillText(inv[i].n,275+x*60,438+y*60)}}
		};x++;if (x>9) {x=0;y++}
	}

	ctx.fillStyle = "#bbb8";
	if (mx>395 && mx<445 && my>105 && my<155) {ctx.fillRect(395,105,50,50)}
	if (mx>395 && mx<445 && my>165 && my<215) {ctx.fillRect(395,165,50,50)}
	if (mx>395 && mx<445 && my>225 && my<285) {ctx.fillRect(395,225,50,50)}
	if (mx>395 && mx<445 && my>285 && my<335) {ctx.fillRect(395,285,50,50)}

	if (mx>505 && mx<605 && my>115 && my<215) {ctx.fillRect(505,115,100,100)}
	if (mx>505 && mx<605 && my>225 && my<325) {ctx.fillRect(505,225,100,100)}
	if (mx>615 && mx<715 && my>115 && my<215) {ctx.fillRect(615,115,100,100)}
	if (mx>615 && mx<715 && my>225 && my<325) {ctx.fillRect(615,225,100,100)}
	
	if (mx>740 && mx<840 && my>170 && my<270) {ctx.fillRect(740,170,100,100)}

	for (let i2=0;i2<4;i2++) {for (let i=0;i<10;i++) {if (i2<3) {if (mx>255+60*i && mx<305+60*i && my>390+60*i2 && my<440+60*i2) {ctx.fillRect(255+60*i,390+60*i2,50,50);invDown(i+i2*10)}} else {if (mx>255+60*i && mx<305+60*i && my>640 && my<690) {ctx.fillRect(255+60*i,640,50,50);invDown(i+30)}}}}

	if (invTar.id > 0) {
		ctx.drawImage(img[invTar.id],mx-25,my-25,50,50);
		if (invTar.n > 1) {
			ctx.fillStyle="#fff";ctx.strokeStyle="#0005";ctx.font="20px serif";if (invTar.n<10) {ctx.strokeText(invTar.n,mx+17,my+26);ctx.fillText(invTar.n,mx+16,my+25)};
			if (invTar.n>9 && invTar.n<100) {ctx.strokeText(invTar.n,mx+7,my+26);ctx.fillText(invTar.n,mx+6,my+25)};if (invTar.n>99 && invTar.n<1000) {ctx.strokeText(invTar.n,mx-7,my+26);ctx.fillText(invTar.n,mx-8,my+25)};
		}
	}
}
function invDown(i) {
	if (invTar.id==0 && inv[i].id>0) {
		ctx.font="16px serif";let textName=getName(inv[i].id);let textLeft=mx-(ctx.measureText(textName).width/2)-6;

		ctx.strokeStyle="#bbbb";ctx.strokeRect(textLeft,my-25,ctx.measureText(textName).width+12,25);ctx.fillStyle="#333b";ctx.fillRect(textLeft,my-25,ctx.measureText(textName).width+12,25);

		ctx.fillStyle="#fff";ctx.strokeStyle="#0005";ctx.strokeText(textName,textLeft+6,my-6);ctx.fillText(textName,textLeft+5,my-7);
	}

	if (md==true && invTar.id==0) {
		md=false;invTar=inv[i];inv[i]={id:0,n:0,max:0};
	} else if (md) {
		if(shift==false) {
			if (inv[i].id==invTar.id) {md=false;inv[i].n+=invTar.n;if (inv[i].n>inv[i].max) {invTar.n=inv[i].n-inv[i].max;inv[i].n=inv[i].max} else {invTar={id:0,n:0,max:0}}}
			else if (inv[i].id==0) {md=false;inv[i]=invTar;invTar={id:0,n:0,max:0}}
			else {md=false;let asd=inv[i];inv[i]=invTar;invTar=asd}
		} else {
			if (inv[i].id==invTar.id && inv[i].n!=inv[i].max) {md=false;inv[i].n++;invTar.n--;if (invTar.n==0) {invTar={id:0,n:0,max:0}}}
			else if (inv[i].id==0) {md=false;inv[i].id=invTar.id;inv[i].max=invTar.max;inv[i].n=1;invTar.n--;if (invTar.n==0) {invTar={id:0,n:0,max:0}}}
		}
	}
	for(let i2=1;i2<11;i2++){
		let nowKey=false;if(i2==1){nowKey=key1};if(i2==2){nowKey=key2};if(i2==3){nowKey=key3};if(i2==4){nowKey=key4};if(i2==5){nowKey=key5};if(i2==6){nowKey=key6};if(i2==7){nowKey=key7};if(i2==8){nowKey=key8};if(i2==9){nowKey=key9};if(i2==10){nowKey=key0};
		if (nowKey==true && inv[i].id>0 && i!=29+i2) {if(inv[i].id==inv[29+i2].id){inv[29+i2].n+=inv[i].n;if(inv[29+i2].n>inv[29+i2].max){inv[i].n=inv[29+i2].n-inv[29+i2].max;inv[29+i2].n=inv[29+i2].max}else{inv[i]={id:0,n:0,max:0}}}else if(inv[29+i2].id==0){inv[29+i2]=inv[i];inv[i]={id:0,n:0,max:0}}else{let asd=inv[i];inv[i]=inv[29+i2];inv[29+i2]=asd}}
	};key1=false;key2=false;key3=false;key4=false;key5=false;key6=false;key7=false;key8=false;key9=false;key0=false;
}



function interact() {
	let tari = getTarI();
	if (tari !== false) {
		if (obj[tari] == 1) {load = 0; loadStep = 0.75; lock = true}
		if (obj[tari] == 2 || obj[tari] == 3) {load = 0; loadStep = 5; lock = true}
	}
}
function loadEnd() {
	let tari = getTarI(); lock = false;
	if (obj[tari] == 1) {obj[tari] = 0}
	if (obj[tari] == 2) {obj[tari] = 4; setTimeout(function() {obj[tari] = 2}, 60000)}
	if (obj[tari] == 3) {obj[tari] = 4; setTimeout(function() {obj[tari] = 3}, 60000)}
}
function generation() {
	let x=0,y=0,n=0;
	for (let i=0;i<mapWidth*mapHeight;i++) {
		if (parseInt(Math.random()*10) == 0) {n=1}
		if (parseInt(Math.random()*190) == 0) {n=2}
		if (parseInt(Math.random()*190) == 0) {n=3}

		if (i == 0 || i == 1 || i == mapWidth) {n=0}; obj.push(n); n=0;
		x++; if (x > mapWidth-1) {x=0;y++}
	}
}
function preload() {
	let massive = ["grass","tree","bluebush","redbush","bush","stone","playerW","playerA","playerS","playerD",//9
	"blueberry","redberry","stick1","stick2","wood","woodenPickaxe","woodenAxe","stonePickaxe","stoneAxe",//18
	"ironPickaxe","ironAxe","goldPickaxe","goldAxe","coal","ironIngot","goldIngot","coalOre","ironOre","goldOre",//28
	"caveHole","caveUp","stoneFloor","furnaceOff","furnaceOn","food","halfFood","darkFood","heart","halfHeart",//38
	"darkHeart","error"];//40
	for (let i = 0; i < 41; i++) {
		drawImg = new Image(); drawImg.src = "img/"+massive[i]+".png"; img.push(drawImg);
	}
}
function getName(i) {
	if (i==0) {return "Блок травы"};if (i==2) {return "Куст синих ягод"};if (i==3) {return "Куст красных ягод"};if (i==4) {return "Куст"}
	if (i==5) {return "Камень"};if (i==10) {return "Синие ягоды"};if (i==11) {return "Красные ягоды"};if (i==12 || i==13) {return "Палка"}
	if (i==14) {return "Дерево"};if (i==15) {return "Деревянная кирка"};if (i==16) {return "Деревянный топор"};if (i==17) {return "Каменная кирка"}
	if (i==18) {return "Каменный топор"};if (i==10) {return "Железная кирка"};if (i==20) {return "Железный топор"};if (i==21) {return "Золотая кирка"}
	if (i==22) {return "Золотой топор"};if (i==23) {return "Уголь"};if (i==24) {return "Железный слиток"};if (i==25) {return "Золотой слиток"}
	if (i==26) {return "Угольная руда"};if (i==27) {return "Железная руда"};if (i==28) {return "Золотая руда"};if (i==32) {return "Печка"}
	return "Ошибка";
}
function solid() {
	n = false;
	if (side == 6 && wy != 0) {n = obj[pi()-mapWidth]}
	if (side == 7 && wx != 0) {n = obj[pi()-1]}
	if (side == 8 && wy != mapHeight-1) {n = obj[pi()+mapWidth]}
	if (side == 9 && wx != mapWidth-1) {n = obj[pi()+1]}
	
	if (n == 12 || n == 13) {n = false}
	return n;
}
function pi() {return wy*mapWidth+wx}; function game() {controls();draw()}
function getTarI() {if (side==6 && wy!=0) {return pi()-mapWidth};if (side==7 && wx!=0) {return pi()-1};if (side==8 && wy!=mapHeight-1) {return pi()+mapWidth};if (side==9 && wx!=mapWidth-1) {return pi()+1};return false}
onmousedown=function() {md=true}; onmouseup=function() {md=false}
onmousemove=function(e) {mx=parseInt(1101/window.innerWidth*e.pageX);my=parseInt(701/window.innerHeight*e.pageY)}
onmousewheel=function(e) {if (e.wheelDelta > 0) {hotbar++;if (hotbar>10) {hotbar=1}} else {hotbar--;if (hotbar<1) {hotbar=10}}}
onkeydown=function(e) {
	if (e.which == 87) {keyw=true}
	if (e.which == 65) {keya=true}
	if (e.which == 83) {keys=true}
	if (e.which == 68) {keyd=true}
	if (e.which == 69) {keye=true}
	if (e.which == 81) {keyq=true}
	if (e.which == 70) {keyf=true}
	if (e.which == 82) {keyr=true}
	if (e.which == 32) {space=true}
	if (e.which == 16) {shift=true}

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
onkeyup=function(e) {
	if (e.which == 87) {keyw=false}
	if (e.which == 65) {keya=false}
	if (e.which == 83) {keys=false}
	if (e.which == 68) {keyd=false}
	if (e.which == 69) {keye=false}
	if (e.which == 81) {keyq=false}
	if (e.which == 70) {keyf=false}
	if (e.which == 82) {keyr=false}
	if (e.which == 32) {space=false}
	if (e.which == 16) {shift=false}

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