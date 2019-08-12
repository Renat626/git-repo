var items = 0, price = 0;
function buy(cost) {
	items++; allItems.textContent = "Количество товаров: "+items+". ";
	price += cost; allPrice.textContent = "Стоимость: "+price+"р.";
}