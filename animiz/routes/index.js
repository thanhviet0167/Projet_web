var express = require('express');
var router = express.Router();

/*
var mongo = require('mongodb');
var CtrMongoClient = mongo.MongoClient;
var db = mongo.Db;*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next){

  var products = [];
  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Information_Product");
    dbo.collection("List_product").find({}).toArray(function(err, result) {
    if (err) throw err;
    var size_products = 15;
//      console.log(result);
      var productChuck = [];
      var top_product = []
      for(var i = 0; i < result.length; i++)
      {
        if(i <= size_products)
        {
          productChuck.push(result.slice(i,i+1));
        }
        if(result[i].type_product == "top_product")
        {
          top_product.push(result.slice(i,i+1));
        }
      }
      console.log(top_product)
      res.render('index', { title: 'Animiz', products: productChuck, top_product: top_product});
      db.close();
    });
  });

  
});


/* GET Account */

const CtrlAccount = require('../controllers/account_user');
router.get('/user',CtrlAccount.account_user);


router.get('/user/profile', function(req, res, next){
  res.render('users/profile', {title: 'User profile'});
})

router.get('/user/address', function(req, res, next){
  res.render('users/address_account', {title: 'Adress profile'});
})


router.get('/user/change_pw', function(req, res, next){
  res.render('users/change_pw', {title: 'Change the password profile'});
})

// Get Product Details Page

router.get('/product', function(req, res, next){

  var product_id = req.query.id;
  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Information_Product");
    dbo.collection("List_product").find({}).toArray(function(err, result) {
    if (err) throw err;
   
    var product = [];
    var list_product = [];
    var size_list = 0;
    var new_product = [];
      for(var i = 0; i < result.length; i++)
      {
        if(result[i]._id == product_id)
        {
          product.push(result.slice(i,i+1));
        }
        if(i < 6)
        {
          new_product.push(result.slice(i,i+1));
        }
        if(result[i].type_product == "top_product" && size_list < 6)
        {
          list_product.push(result.slice(i,i+1));
          size_list++;
        }
      }
      temp = product[0];
      res.render('products_z/product_details', { title: 'Product Details', 
      product:product, new_product: new_product, list_product: list_product});
      db.close();
    });
  });
});

// Get Result Search Page



router.get('/search', function(req, res, next){
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
  var dbo = db.db("Information_Product");
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

  dbo.collection("List_product").find({}).sort(sort_by).toArray(function(err, result) {
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
     
      console.log(productChuck);
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
//  res.render('products_z/result_search', {title: 'Search Result'});
})

router.get('/user/search', function(req, res, next){
  /*
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
  var dbo = db.db("Information_Product");
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

  dbo.collection("List_product").find({}).sort(sort_by).toArray(function(err, result) {
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
     
      console.log(productChuck);
      if(check == false)
      {
        res.render('users/user_search', { title: 'There is no matching search value'
        , products: productChuck, search_value: search_value, link_price:link_price, link_type:link_type,
          url_price:url_price, url_type, url_type});
      }
      else
      {
        res.render('users/user_search', { title: '', products: productChuck, 
        search_value: search_value, link_price:link_price, link_type:link_type, url_price:url_price, url_type, url_type});
      }
        

      db.close();
    });
  }); 
  }
  else{
    res.render('index_account', { title: 'Animiz'}); 
  }*/
//  res.render('products_z/result_search', {title: 'Search Result'});
 res.render('index_account', { title: 'Animiz'});
})

//router.use(express.static('views'));

module.exports = router;


