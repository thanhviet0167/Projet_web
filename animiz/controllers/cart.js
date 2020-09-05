const { Double } = require("mongodb");

module.exports = function Cart(oldCard){
    this.items = oldCard.items || {};
    this.totalQty = oldCard.totalQty || 0;
    this.totalPrice = oldCard.totalPrice || 0;
    this.add = function(item, id, sl){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        };
        storedItem.qty+=sl;
        storedItem.price = storedItem.item.price * storedItem.qty;
    //  storedItem.price = storedItem.item.price;
        this.totalQty+=sl; 
        this.totalPrice += storedItem.item.price*Double(sl);
    };
    this.reduce_One = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        if(this.items[id].qty < 1)
        {
            delete this.items[id];
        }
    };
    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id])
        }
        return arr;
    };
};