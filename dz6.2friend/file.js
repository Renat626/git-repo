"use strict";

let items = 0, price = 0;
function listener() {
	document.addEventListener('click', event => checkClick(event));
}
function checkClick(event) {
	if (event.target.tagName !== 'BUTTON') {return}
   	else {
   		items++; allItems.textContent = "Количество товаров: "+items+". ";
		price += parseInt(event.target.dataset.cost); allPrice.textContent = "Стоимость: "+price+"р.";
   	}
}
window.onload = () => listener();