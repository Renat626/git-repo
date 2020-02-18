onscroll = function(e) {
	if (window.scrollY > document.getElementById("header__main__contant").offsetHeight) {
		document.getElementById("header__menu_mini").style.top = "0px";
	} else {
		document.getElementById("header__menu_mini").style.top = "-100px";
	}
}