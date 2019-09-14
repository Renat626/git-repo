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
	for (let i = 0; i < jsonObj.length; i++) {
		let divObj = document.createElement('div');
		divObj.id = jsonObj[i]['id_product'];
		basket.appendChild(divObj);
	
		let imgObj = document.createElement('img');
		imgObj.src = "https://placehold.it/200x150";
		divObj.appendChild(imgObj);
	
		let nameObj = document.createElement('h1');
		nameObj.textContent = jsonObj[i]['product_name'];
		divObj.appendChild(nameObj);
	
		let priceObj = document.createElement('h3');
		priceObj.textContent = jsonObj[i]['price'];
		divObj.appendChild(priceObj);
	
		let buttonObj = document.createElement('button');
		buttonObj.textContent = "Купить";
		divObj.appendChild(buttonObj);
	}
}