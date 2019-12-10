function draw() {
	ctx.fillStyle = "black"; ctx.fillRect(0,0,canv.width,canv.height);

	if (invOpen == false) { // WORLD
		for (let i = 0; i < obj.length; i++) {
			if (obj[i].x < x+11 && obj[i].x > x-1) {
				if (obj[i].y > y-1 && obj[i].y < y+7) {
					ctx.drawImage(img("grass"),(obj[i].x-x)*100,(obj[i].y-y)*100,100,100);
					if (obj[i].id != "") {ctx.drawImage(img(obj[i].id),(obj[i].x-x)*100,(obj[i].y-y)*100,100,100)}
				}
			}
		}

		if (load < 100) {loadFunc()} // ACTION LOAD

		ctx.drawImage(img(side),500,300,100,100); // PLAYER

		for (let i = 0; i < 10; i++) { // HOTBAR HEALTH/FOOD/SLOTS
			if (health >= i*10+5) {ctx.drawImage(img("heart"),i*25+300,610,25,25)} else if (health >= i*10) {ctx.drawImage(img("halfHeart"),i*25+300,610,25,25)} else {ctx.drawImage(img("darkHeart"),i*25+300,610,25,25)}
			
			if (food >= i*10+5) {ctx.drawImage(img("food"),i*25+550,610,25,25)} else if (food >= i*10) {ctx.drawImage(img("halfFood"),i*25+550,610,25,25)} else {ctx.drawImage(img("darkFood"),i*25+550,610,25,25);}
			ctx.fillStyle = "rgb(99,99,99)"; ctx.fillRect(i*50+300,640,50,50);
			
			if (inv[i].id != "") {
				ctx.drawImage(img(inv[i].id),i*50+300,640,50,50);
				ctx.fillStyle = "white"; ctx.font = "16px serif";
				if (inv[i].n > 9 && inv[i].n < 100) {ctx.fillText(inv[i].n,i*50+330,685)}
				else if (inv[i].n != 1) {ctx.fillText(inv[i].n,i*50+338,685)}
			}
			
			ctx.strokeStyle = "rgb(200,200,200)"; ctx.strokeRect(i*50+300,640,50,50); ctx.strokeRect(i*50+301,641,48,48);
		}
		ctx.strokeStyle = "rgb(0,0,0)"; ctx.strokeRect(hotbarN*50+300,640,50,50); ctx.strokeRect(hotbarN*50+301,641,48,48);
	}

	if (invOpen == true) { // INVENTORY
		ctx.fillStyle = "rgb(77,77,155)"; ctx.fillRect(0,0,canv.width,canv.height);

		let step = 0;
		for (let i2 = 0; i2 < 3; i2++) {
			for (let i = 0; i < 10; i++) { // INV PANEL
				ctx.fillStyle = "rgb(88,88,122)"; ctx.fillRect(i*110+10,i2*110+10,90,90);

				if (inv[step].id != "") {
					ctx.drawImage(img(inv[step].id),i*110+10,i2*110+10,90,90);
					ctx.fillStyle = "white"; ctx.font = "24px serif";
					if (inv[step].n > 9 && inv[step].n < 100) {ctx.fillText(inv[step].n,i*110+75,i2*110+95)}
					else if (inv[step].n != 1) {ctx.fillText(inv[step].n,i*110+85,i2*110+95)}
				}

				if (step == invN && craftOpen == false) {ctx.strokeStyle = "red"} else if (step == toolN) {ctx.strokeStyle = "lime"} else {ctx.strokeStyle = "black"}
				ctx.strokeRect(i*110+10,i2*110+10,90,90); ctx.strokeRect(i*110+11,i2*110+11,88,88);
				step++;

				if (inv[invN].id != "" && craftOpen == false) {ctx.fillStyle = "white"; ctx.font = "48px serif"; ctx.fillText(name(inv[invN].id),10,370)}
				else if (craft[craftN].id != "" && craftOpen == true) {ctx.fillStyle = "white"; ctx.font = "48px serif"; ctx.fillText(name(craft[craftN].id),10,370)}
			}
		}

		step = 0;
		for (let i2 = 0; i2 < 3; i2++) { // CRAFT PANEL
			for (let i = 0; i < 3; i++) {
				ctx.fillStyle = "rgb(88,88,122)"; ctx.fillRect(i*110+560,i2*110+356,90,90);

				if (craft[step].id != "") {
					ctx.drawImage(img(craft[step].id),i*110+560,i2*110+356,90,90);
					ctx.fillStyle = "white"; ctx.font = "24px serif";
					if (craft[step].n > 9 && craft[step].n < 100) {ctx.fillText(craft[step].n,i*110+625,i2*110+441)}
					else if (craft[step].n != 1) {ctx.fillText(craft[step].n,i*110+635,i2*110+441)}
				}

				if (step == craftN && craftOpen == true) {ctx.strokeStyle = "red"} else {ctx.strokeStyle = "gray"}
				ctx.strokeRect(i*110+560,i2*110+356,90,90); ctx.strokeRect(i*110+561,i2*110+357,88,88);
				step++;
			}
		}
		ctx.fillStyle = "rgb(88,88,122)"; ctx.strokeStyle = "gray"; ctx.fillRect(925,446,130,130); craftCheck();
		ctx.strokeRect(925,446,130,130); ctx.strokeRect(926,447,128,128);

		if (invCut.id != "") { // INVCUT
			ctx.drawImage(img(invCut.id),450,355,90,90);
			ctx.fillStyle = "white"; ctx.font = "24px serif";
			if (invCut.n > 9 && invCut.n < 100) {ctx.fillText(invCut.n,515,441)}
			else if (invCut.n != 1) {ctx.fillText(invCut.n,525,441)}
		}
	}

	if (openMsg == true) { // MSG
		ctx.fillStyle = "rgb(111,111,111)"; ctx.fillRect(300,200,500,300);
		ctx.strokeStyle = "rgb(0,0,0)"; ctx.strokeRect(300,200,500,300); ctx.strokeRect(301,201,498,298);
		ctx.fillStyle = "white"; ctx.font = "48px serif"; 
		ctx.fillText(textMsg1,310,300,475); ctx.fillText(textMsg2,310,355,475); ctx.fillText(textMsg3,310,410,475);
	}
}