/*sliderLeft()
sliderRight()*/
autoSliderLeft()

document.getElementById("slider-left").onclick = sliderLeft;
document.getElementById("slider-right").onclick = sliderRight;
var left = 0;
var timer;

function autoSliderLeft() {
	timer = setTimeout(sliderLeft, 1000);
}

function sliderLeft() {
	var contant = document.getElementById("contant");
	left = left - 800;
	if(left < -4000) {
		left = 0;
		clearTimeout(timer);
	}
	contant.style.left = left + "px";
	autoSliderLeft ();
}

function sliderRight() {
	var contant = document.getElementById("contant");
	left = left + 800;
	if(left > 0) {
		left = -4000;
	}
	contant.style.left = left + "px";
}

/*Скругление*/

document.getElementById("renat").oninput = borderRadius;

function borderRadius() {
	var div = document.getElementById("test");
	div.style.borderRadius = this.value + "px";
}