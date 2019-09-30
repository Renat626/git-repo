const vue1 = new Vue({
  el: '#app',
  data: {
    goods: {},
    goodsList: [],
    sum: 0
  },
  methods: {
    buyProduct(event) {
      const block = document.querySelector('.container__basket_drop_block');
      this.goods.price = +(event.target.dataset.price);
      this.sum += this.goods.price;
      this.goods.value = (event.target.dataset.value);
      this.goods.img = (event.target.dataset.img);
      this.goods.number = +(event.target.dataset.number);
      console.log(this.goods);
      let copy = Object.assign({}, this.goods);
      let check = false;
      for(let i = 0; i < this.goodsList.length; i++){
        if(this.goods.value == this.goodsList[i].value){
          this.goodsList[i].number++;
          check = true;
        }
        if(this.goods.number < 1){
          block.style.display = 'none';
        }
      }
      if(check == false){
        this.goodsList.push(copy);
      }
    },
    updateSum(price){
      this.sum = this.sum - price;
    }
  },
});
