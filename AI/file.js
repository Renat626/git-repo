let h = [], t = [];
window.onload = function() {
	for (let i = 0; i < 3; i++) {
		let elem = document.createElement("div"); elem.id = "t" + (t.length+1);
		elem.className = "tree"; t.push({id: "t"+(t.length+1), target: false});
		let x = parseInt(Math.random() * window.innerWidth - 50), y = parseInt(Math.random() * window.innerHeight - 50);
		if (x < 0) {x += 50}; if (y < 0) {y += 50}
		elem.style.left = x + "px"; elem.style.top = y + "px"; document.body.appendChild(elem);
	}
	for (let i = 0; i < 1; i++) {
		let elem = document.createElement("div"); elem.id = "h" + (h.length+1); elem.className = "human";
		h.push({id: "h"+(h.length+1), target: "", n: 0, work: "chop"}); document.body.appendChild(elem);
	}
}
setInterval(function() {
	if (h.length > 0) {
		for (var i = 0; i < h.length; i++) {
			if (h[i].target == "") {
				if (h[i].work == "chop") {
					for (let b = 0; b < t.length; b++) {
						if (t[b].target == false) {h[i].target = t[b].id; t[b].target = true; break}
					}
				}
				if (h[i].work == "build") {
					let x = parseInt(Math.random() * window.innerWidth - 50), y = parseInt(Math.random() * window.innerHeight - 50);
					if (x < 0) {x += 50}; if (y < 0) {y += 50}
					let elem = document.createElement("div"); elem.style.left = x + "px"; elem.style.top = y + "px";
					elem.className = "house"; elem.id = "h"+h[i].id; document.body.appendChild(elem); h[i].target = elem.id;
				}
				if (h[i].work == "grow") {
					let x = parseInt(Math.random() * window.innerWidth - 50), y = parseInt(Math.random() * window.innerHeight - 50);
					if (x < 0) {x += 50}; if (y < 0) {y += 50}
					let elem = document.createElement("div"); elem.style.left = x + "px"; elem.style.top = y + "px";
					elem.className = "newTree"; elem.id = "newTree"+h[i].n+h[i].id; document.body.appendChild(elem); h[i].target = elem.id;
				}
			} else {
				let hObj = document.getElementById(h[i].id), tObj = document.getElementById(h[i].target);
				if (hObj.offsetLeft < tObj.offsetLeft) {hObj.style.left = hObj.offsetLeft + 1 + "px"}
				if (hObj.offsetLeft > tObj.offsetLeft) {hObj.style.left = hObj.offsetLeft - 1 + "px"}
				if (hObj.offsetTop < tObj.offsetTop) {hObj.style.top = hObj.offsetTop + 1 + "px"}
				if (hObj.offsetTop > tObj.offsetTop) {hObj.style.top = hObj.offsetTop - 1 + "px"}

				if (hObj.offsetLeft == tObj.offsetLeft && hObj.offsetTop == tObj.offsetTop) {
					h[i].target = "";
					if (h[i].work == "chop") {
						h[i].n++; tObj.remove();
						if (h[i].n == 3) {h[i].work = "build"; break}
					}
					if (h[i].work == "build") {
						h[i].n = 0; tObj.style.visibility = "visible";
						setTimeout(function() {
							tObj.remove();
						}, 15000);

						for (var b = 0; b < 2; b++) {
							let elem = document.createElement("div"); elem.id = "h" + (h.length+1); elem.className = "human";
							h.push({id: "h"+(h.length+1), target: "", n: 0, work: "chop"}); 
							elem.style.left = tObj.offsetLeft + "px"; elem.style.top = tObj.offsetTop + "px";
					 		document.body.appendChild(elem);
						}

						h[i].work = "grow"; break;
					}
					if (h[i].work == "grow") {
						h[i].n++; tObj.style.visibility = "visible";
						setTimeout(function() {
							tObj.className = "tree"; tObj.id = "t" + (t.length+1);
							t.push({id: "t"+(t.length+1), target: false});
						}, 5000);
						if (h[i].n == 6) {h[i].work = "none"; hObj.remove(); break}
					}
				}
			}
		}
	}
}, 8);