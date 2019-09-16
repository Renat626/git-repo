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
		divObj.classList.add('renat');
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

		console.log(jsonObj['product_name']);
	};

	console.log(jsonObj[0]['product_name']);

	function filter(value){
		const regexp = new RegExp(value, 'i');
		if(!regexp.test(jsonObj[0]['product_name'])){
			const divObj = document.querySelector('.renat');
			if(divObj.id == '123'){
				divObj.classList.add('invisible');
			}
		};
		if(!regexp.test(jsonObj[1]['product_name'])){
			const divObj = document.querySelector('.renat');
			if(divObj.id == '456'){
				divObj.classList.add('invisible');
			}
		}
		// let filtered = [];
		// filtered = jsonObj.filter(product => {regexp.test(product.product_name)});
		// jsonObj.forEach(el => {
		// 	if(!filtered.includes(el)){
		// 		divObj.classList.add('invisible');
		// 	} else {
		// 		divObj.classList.remove('invisible');
		// 	}
		// })
	};

	function init(){
		document.querySelector('.btn-search').addEventListener('click', event => {
			event.preventDefault();
			filter(document.querySelector('.search').value);
		})
	};

	init();
}

function r(){
	const t = document.querySelector('.c');


	if(t.id == 'id'){
		t.style.color = 'green';
	}


}

r();
