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
const polosa = document.querySelector(".polosa");

buttonLeft.addEventListener('click', sliderLeft);
buttonRight.addEventListener('click', sliderRight);

let step = 0;

function sliderLeft() {
	if (step < 0) {
		step += 300;
	} else {
		step = -600;
	}
	polosa.style.left = step + "px";
}

function sliderRight() {
	if (step > -600) {
		step -= 300;
	} else {
		step = 0;
	}
	polosa.style.left = step + "px";
}

//header__burgerMenu

const burgerButton = document.querySelector('#burger__button');
const burgerMenu = document.querySelector('.header__menu_show');

burgerButton.addEventListener('click', showMenu);

function showMenu() {
	if (burgerMenu.style.display == "block") {
		burgerMenu.style.display = "none";
	} else {
		burgerMenu.style.display = "block";
	}
}
