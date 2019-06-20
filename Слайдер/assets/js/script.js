/*sliderLeft()
sliderRight()*/

document.getElementById("slider-left").onclick = sliderLeft;
document.getElementById("slider-right").onclick = sliderRight;
var left = 0;

function sliderLeft() {
	var contant = document.getElementById("contant");
	left = left - 800;
	if(left < -4000) {
		left = 0;
	}
	contant.style.left = left + "px";
}

function sliderRight() {
	var contant = document.getElementById("contant");
	left = left + 800;
	if(left > 0) {
		left = -4000;
	}
	contant.style.left = left + "px";
}