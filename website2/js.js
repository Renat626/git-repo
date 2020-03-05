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
let headerContant = document.querySelector('.header__contant');
let burgerMenu = document.querySelector('.header__menu_show');

burgerButton.addEventListener('click', showMenu);

function showMenu() {
	if (headerContant.offsetHeight != 272 && document.body.offsetWidth < 821) {
		headerContant.style.height = "232px";
		burgerMenu.style.visibility = "hidden";
		headerContant.style.transition = "0.8s";
		burgerMenu.style.transition = "0.2s";
		burgerMenu.style.opacity = 0;

	} else if (headerContant.offsetHeight == 272 && document.body.offsetWidth < 821) {
		headerContant.style.height = headerContant.offsetHeight+100+"px";
		headerContant.style.transition = "0.3s";
		burgerMenu.style.transition = "0.8s";
		burgerMenu.style.visibility = "visible";
		burgerMenu.style.opacity = 1;
	}

	console.log(document.body.offsetWidth);
}

//answers

const question = document.querySelectorAll("#question");

question.forEach(function (item) {
	item.addEventListener('click', showAnswer);
})

function showAnswer() {
	let id = event.target.parentElement.id;
	let que = event.target.parentElement;
	let ans = event.target.parentElement.lastElementChild;
	let que2 = event.target;
	let ans2 = event.target.lastElementChild;

	if (id == "question") {
		if (que.offsetHeight != 54) {
				que.style.height = "50px";
				ans.style.visibility = "hidden";
				ans.style.transition = "0.25s";
				ans.style.opacity = 0;
			}	else {
					que.style.height = ans.offsetHeight+60+"px";
					ans.style.visibility = "visible";
					ans.style.transition = "0.8s";
					ans.style.opacity = 1;
				}
	} else {
		if (que2.offsetHeight != 54) {
				que2.style.height = "50px";
				ans2.style.visibility = "hidden";
				ans2.style.transition = "0.25s";
				ans2.style.opacity = 0;
			}	else {
					que2.style.height = ans2.offsetHeight+60+"px";
					ans2.style.visibility = "visible";
					ans2.style.transition = "0.8s";
					ans2.style.opacity = 1;
				}
	}
}
