onscroll = function(e) {
	if (window.scrollY > document.getElementById("header__main__contant").offsetHeight) {
		document.getElementById("header__menu_mini").style.top = "0px";
	} else {
		document.getElementById("header__menu_mini").style.top = "-100px";
	}
}

//slider

const buttonLeft = document.querySelector(".reviews__arrow__left");
const buttonRight = document.querySelector(".reviews__arrow__right");
let left = 0;
let right = 0;

buttonLeft.addEventListener('click', sliderLeft);
buttonRight.addEventListener('click', sliderRight);

function sliderLeft() {
	const polosa = document.querySelector(".polosa");
	left = left + 300;
	if(left > 0) {
		left = -600;
	}
	polosa.style.left = left + "px";
}

function sliderRight() {
	const polosa = document.querySelector(".polosa");
	right = right - 300;
	if(right < -600) {
		right = 0;
	}
	polosa.style.left = right + "px";
}
