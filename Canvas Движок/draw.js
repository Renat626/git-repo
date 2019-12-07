function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canv.width,canv.height);

	for (let i = 0; i < obj.length; i++) {
		if (obj[i].x < x+11 && obj[i].x > x-1) {
			if (obj[i].y > y-1 && obj[i].y < y+7) {
				ctx.drawImage(img("grass"),(obj[i].x-x)*100,(obj[i].y-y)*100,100,100);
				if (obj[i].id != "") {ctx.drawImage(img(obj[i].id),(obj[i].x-x)*100,(obj[i].y-y)*100,100,100)}
			}
		}
	}

	if (load < 100) {loadFunc()}

	ctx.drawImage(img(side),500,300,100,100);

	if (openInv == true) {
		ctx.fillStyle = "rgb(77,77,155)"; ctx.fillRect(0,0,canv.width,canv.height);

		let step = 0;
		for (let i2 = 0; i2 < 3; i2++) {
			for (let i = 0; i < 10; i++) {
				ctx.fillStyle = "rgb(88,88,122)"; ctx.fillRect(i*110+10,i2*110+10,90,90);

				if (inv[step].id != "") {
					ctx.drawImage(img(inv[step].id),i*110+10,i2*110+10,90,90);
					ctx.fillStyle = "white"; ctx.font = "24px serif";
					if (inv[step].n > 9 && inv[step].n < 100) {ctx.fillText(inv[step].n,i*110+75,i2*110+95)}
					else if (inv[step].n > 99) {ctx.fillText(inv[step].n,i*110+62,i2*110+95)}
					else if (inv[step].n != 1) {ctx.fillText(inv[step].n,i*110+85,i2*110+95)}
				}

				if (step == invN && craftOpen == false) {ctx.strokeStyle = "red"} else if (step == toolN) {ctx.strokeStyle = "lime"} else {ctx.strokeStyle = "black"}
				ctx.strokeRect(i*110+10,i2*110+10,90,90); ctx.strokeRect(i*110+11,i2*110+11,88,88);
				step++;

				if (inv[invN].id != "") {ctx.fillStyle = "white"; ctx.font = "48px serif"; ctx.fillText(name(inv[invN].id),10,370)}
			}
		}

		step = 0;
		for (let i2 = 0; i2 < 3; i2++) {
			for (let i = 0; i < 3; i++) {
				ctx.fillStyle = "rgb(88,88,122)"; ctx.fillRect(i*110+560,i2*110+356,90,90);

				if (craft[step].id != "") {ctx.drawImage(img(craft[step].id),i*110+560,i2*110+356,90,90)}

				if (step == craftN && craftOpen == true) {ctx.strokeStyle = "red"} else {ctx.strokeStyle = "gray"}
				ctx.strokeRect(i*110+560,i2*110+356,90,90); ctx.strokeRect(i*110+561,i2*110+357,88,88);
				step++;
			}
		}
		ctx.strokeStyle = "gray"; ctx.fillRect(925,446,130,130); craftCheck();
		ctx.strokeRect(925,446,130,130); ctx.strokeRect(926,447,128,128);
	}

	if (openMsg == true) {
		ctx.fillStyle = "rgb(99,99,99)"; ctx.fillRect(300,200,500,300);
		ctx.strokeStyle = "rgb(0,0,0)"; ctx.strokeRect(300,200,500,300); ctx.strokeRect(301,201,498,298);
		ctx.fillStyle = "white"; ctx.font = "48px serif"; 
		ctx.fillText(textMsg1,310,300,475); ctx.fillText(textMsg2,310,355,475); ctx.fillText(textMsg3,310,410,475);
	}
}