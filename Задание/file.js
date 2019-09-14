window.onload = function() {
	let requestURL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json";
	let request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		populate(request.response);
	}
}
function populate(jsonObj) {
	let div1 = document.createElement('div');
	div1.id = jsonObj[0]['id_product'];
	basket.appendChild(div1);
	
	let img1 = document.createElement('img');
	img1.src = "https://placehold.it/200x150";
	div1.appendChild(img1);

	let name1 = document.createElement('h1');
	name1.textContent = jsonObj[0]['product_name'];
	div1.appendChild(name1);

	let price1 = document.createElement('h3');
	price1.textContent = jsonObj[0]['price'];
	div1.appendChild(price1);

	let button1 = document.createElement('button');
	button1.textContent = "Купить";
	div1.appendChild(button1);


	let div2 = document.createElement('div');
	div2.id = jsonObj[1]['id_product'];
	basket.appendChild(div2);

	let img2 = document.createElement('img');
	img2.src = "https://placehold.it/200x150";
	div2.appendChild(img2);

	let name2 = document.createElement('h1');
	name2.textContent = jsonObj[1]['product_name'];
	div2.appendChild(name2);

	let price2 = document.createElement('h3');
	price2.textContent = jsonObj[1]['price'];
	div2.appendChild(price2);

	let button2 = document.createElement('button');
	button2.textContent = "Купить";
	div2.appendChild(button2);
}