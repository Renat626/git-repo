"use strict";

const basket = {
	settings: {
	countSelector: '#basket-count',
	priceSelector: '#basket-price',
	},
	goods: [],
	nameGoods: [],
	countEl: null,
	priceEl: null,

init(settings = {}) {
	Object.assign(this.settings, settings);

	this.countEl = document.getElementById("basket-count");
	this.priceEl = document.getElementById("basket-price");

	

	document
      .addEventListener('click', event => this.containerClickHandler(event));

    this.render();
},

containerClickHandler(event) {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const productPrice = (event.target.dataset.price);
    const productName = (event.target.dataset.name);
    this.goods.push(+productPrice);
    let sum = 0;
	for(let i = 0; i < this.goods.length; i++) {
		sum += this.goods[i];
	}

	this.priceEl.innerHTML = sum;



	this.nameGoods.push(productName);
    

	this.countEl.innerHTML = this.nameGoods.length;
  },
};

window.onload = () => basket.init();