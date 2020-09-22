const { ObjectId } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://animiz:animiz@cluster0.yfhgm.mongodb.net";
var express = require('express');

// mongodb+srv://animiz:animiz@cluster0.yfhgm.mongodb.net/test

//Function Searc

const search = (req, res, next) => {
    const queryParams = req.query;
    const key_search = req.query.search;
    var search_value = req.query.search;


    var url_price = req.query.sort;
    var link_price;
    
    if(url_price != undefined)
    {
        link_price = "&sort="+url_price;
    }

    var url_type = req.query.type;
    var link_type;
    
    if(url_type != undefined)
    {
        link_type = "&type="+url_type;
    }
    
    
    if(key_search != "")
    {

    MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Product");
    var sort_by;
    if(url_price == "discount")
    {
        sort_by = {price: 1};
    }
    else{
        if(url_price == "increase")
        {
        sort_by = {price: -1};
        }
    }

    dbo.collection("List_Product").find({}).sort(sort_by).toArray(function(err, result) {
        if (err) throw err;
        var productChuck = [];
        var keysearch = key_search.toLowerCase();
        var k_search = keysearch.toLowerCase();
        var check = false;
        for(var i = 0; i < result.length; i++)
        {
            let name_key = result[i].title.toLowerCase();
            if(name_key.includes(k_search))
            {
            if(url_type == undefined)
            {
                productChuck.push(result.slice(i,i+1));
                check = true;
            }
            else{
                if(url_type == result[i].type)
                {
                productChuck.push(result.slice(i,i+1));
                check = true;
                }
            }
            }
            
        }
        
        if(check == false)
        {
            res.render('products_z/result_search', { title: 'There is no matching search value'
            , products: productChuck, search_value: search_value, link_price:link_price, link_type:link_type,
            url_price:url_price, url_type, url_type});
        }
        else
        {
            res.render('products_z/result_search', { title: '', products: productChuck, 
            search_value: search_value, link_price:link_price, link_type:link_type, url_price:url_price, url_type, url_type});
        }
            

        db.close();
        });
    }); 
    }
    else{
        res.render('index', { title: 'Animiz'});
    }
};


// Product Details
var Cart = require('../controllers/cart');

var add_to_cart = (req,res, next) => {
    var product_id = req.query.id;
    var product_number = Number(req.query.sl);    
    MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Product");
  
    
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    dbo.collection("List_Product").find({_id: ObjectId(product_id)}).toArray(function(err, result) {
        if(err){
            return res.redirect('/');
        }
        cart.add(result[0],result[0]._id, product_number);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    }); 
    })
}

var Buy_Product = (req, res, next) => {
    req.session.cart = {};
    res.redirect('/');
}

var Reduce_One = (req, res, next) => {
    var productId = req.query.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    cart.reduce_One(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}

var shopping_cart = (req, res, next) => {
    MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
        if (err) throw err;
        var dbo = db.db("Product");
      
        dbo.collection("List_Product").find({}).toArray(function(err, result) {
        if (err) throw err;
        
        var list_product = [];
        var size_list = 0;
        var new_product = [];
        var size_new = 0;
          for(var i = 0; i < result.length; i++)
          {
           
              if(size_new < 6)
                {
                    new_product.push(result.slice(i,i+1));
                    size_new++;
                }
                if(result[i].type_product == "top_product" && size_list < 6)
                {
                    list_product.push(result.slice(i,i+1));
                    size_list++;
                }
            
          }
          
         
          if(!req.session.cart){
            return  res.render('products_z/shopping_cart', { title: "Shopping Cart", 
            products:null, totalPrice: 0,
            new_product: new_product, list_product: list_product, session: req.session});
            db.close();
          }
          var cart = new Cart(req.session.cart);
          res.render('products_z/shopping_cart', { title: "Shopping Cart", 
          products:cart.generateArray(), totalPrice: cart.totalPrice,
          new_product: new_product, list_product: list_product, session: req.session});
          db.close();
        });
      });
}



const Details = (req, res, next) => {
    var product_id = req.params.id;
    MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Product");
    var product = [];
    dbo.collection("List_Product").find({_id: ObjectId(product_id)}).toArray(function(err, result) {

        
        for(var i = 0; i < result.length; i++)
        {
            product.push(result.slice(i,i+1));
        }

    });

    dbo.collection("List_Product").find({}).toArray(function(err, result) {
    if (err) throw err;
    var list_product = [];
    var size_list = 0;
    var new_product = [];
    var size_new = 0;
      for(var i = 0; i < result.length; i++)
      {
        if(result[i]._id != product_id)
        {
            if(size_new < 6)
            {
                new_product.push(result.slice(i,i+1));
                size_new++;
            }
            if(result[i].type_product == "top_product" && size_list < 6)
            {
                list_product.push(result.slice(i,i+1));
                size_list++;
            }
        }
        
      }
      res.render('products_z/product_details', { title: 'Product Details', 
      product:product, new_product: new_product, list_product: list_product, session: req.session, productID: product_id});
      db.close();
    });
  });
};



module.exports = {search, Details, add_to_cart, Buy_Product, Reduce_One, shopping_cart}