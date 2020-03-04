//menu

onscroll = function() {
	if (window.scrollY > document.getElementById("header__main__contant").offsetHeight) {
		document.getElementById("header__menu_mini").style.top = "0px";
	} else {
		document.getElementById("header__menu_mini").style.top = "-100px";
	}
}
window.onload = function() {
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


//answers

const question_1 = document.querySelector('#question_1');
const question_2 = document.querySelector('#question_2');
const question_3 = document.querySelector('#question_3');

question_1.addEventListener('click', function(){showAnswer(question_1, answer_1)});
question_2.addEventListener('click', function(){showAnswer(question_2, answer_2)});
question_3.addEventListener('click', function(){showAnswer(question_3, answer_3)});

function showAnswer(que, ans, hei) {
	if (que.offsetHeight != 54) {
		que.style.height = "50px";
		ans.style.visibility = "hidden";
		ans.style.transition = "0.25s";
		ans.style.opacity = 0;
	} 
	else {
		que.style.height = ans.offsetHeight+60+"px";
		ans.style.visibility = "visible";
		ans.style.transition = "0.8s";
		ans.style.opacity = 1;
	}
}