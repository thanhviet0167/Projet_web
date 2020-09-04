var express = require('express');
var router = express.Router();


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
      var top_product = [];
      var list_features = []
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
        if(result[i].type_product == "feature_product")
        {
          list_features.push(result.slice(i,i+1));
        }

      }
      res.render('index', { title: 'Animiz', products: productChuck, top_product: top_product, 
      features_products:list_features, session: req.session});
      db.close();
    });
  });

  
});


router.post('/', function(req, res, next){
  var email_user = req.body.email_user;
  var message_user = req.body.message_user;

  res.redirect('/');
})


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






// Get Result Search Page

const CtrlProduct = require('../controllers/product');
const session = require('express-session');

router.get('/search', CtrlProduct.search);

// Get Product Details Page

router.get('/product/:id', CtrlProduct.Details);

// Shopping Cart

router.get('/add-to-cart', CtrlProduct.add_to_cart);
router.get('/Buy_Product', CtrlProduct.Buy_Product);
router.get('/Remove_One', CtrlProduct.Reduce_One);

var Cart = require('../controllers/cart');
router.get('/shopping-cart', function(req, res, next){
  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Information_Product");
  
    dbo.collection("List_product").find({}).toArray(function(err, result) {
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


// Login and Sign up

router.get('/login', function(req, res, next){
  res.render('users/login', {title: 'Login Form'});
})


router.get('/sign-up', function(req, res, next){
  res.render('users/sign-up', {title: 'Sign up'});
})



/*
router.get("/logout", function (req, res) { 
  req.logout(); 
  res.redirect("/"); 
});*/




//router.use(express.static('views'));

module.exports = router;


