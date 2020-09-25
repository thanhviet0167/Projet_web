var express = require('express');
var router = express.Router();

// update npm
// npm install -g npm-check-updates
// ncu -u
// npm install

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://animiz:animiz@cluster0.yfhgm.mongodb.net";

const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next){

  var products = [];
  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Product");
    dbo.collection("List_Product").find({}).toArray(function(err, result) {
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
      console.log(req.session.user);
      res.render('index', { title: 'Animiz', products: productChuck, top_product: top_product, 
      features_products:list_features, session: req.session, account: req.session.user});
      db.close();
    });
  });

  
});

const Ctrl_Feedback = require('../controllers/feed_back');
router.post('/', Ctrl_Feedback.get_feedback);


/*router.post('/', function(req, res, next){
  var email_user = req.body.email_user;
  var message_user = req.body.message_user;

  res.redirect('/');
})*/


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
router.post('/search',Ctrl_Feedback.get_feedback);

// Get Product Details Page

router.get('/product/:id', CtrlProduct.Details);
router.post('/product/:id', Ctrl_Feedback.get_feedback);

// Shopping Cart

router.get('/add-to-cart', CtrlProduct.add_to_cart);
router.get('/Buy_Product', CtrlProduct.Buy_Product);
router.get('/Remove_One', CtrlProduct.Reduce_One);

var Cart = require('../controllers/cart');
router.get('/shopping-cart', CtrlProduct.shopping_cart);

router.post('/shopping-cart', Ctrl_Feedback.get_feedback);



router.get('/user/search', function(req, res, next){
  console.log(req.body.l_username);
 res.render('index_account', { title: 'Animiz'});
})

router.post('/user/search', Ctrl_Feedback.get_feedback);

// Login and Sign up


var Ctr_User = require('../controllers/account_user');

router.get('/login', function(req, res, next){
  res.render('users/login', {title: 'Login Form'});
});
router.post('/login', Ctr_User.login);

router.get('/sign-up', function(req, res, next){
  res.render('users/sign-up', {title: 'Sign up'});
});

router.post('/sign-up', Ctr_User.register);

router.get('/logout', Ctr_User.logout);

/*
router.get("/logout", function (req, res) { 
  req.logout(); 
  res.redirect("/"); 
});*/


// Product type

var Ctrl_Product_Type = require('../controllers/product_type')

router.get('/feature', Ctrl_Product_Type.feature);
router.post('/feature', Ctrl_Feedback.get_feedback);

router.get('/male_clothes', Ctrl_Product_Type.male);
router.post('/male_clothes', Ctrl_Feedback.get_feedback);

router.get('/female_clothes', Ctrl_Product_Type.female);
router.post('/female_clothes', Ctrl_Feedback.get_feedback);

router.get('/unisex_clothes', Ctrl_Product_Type.unisex);
router.post('/unisex_clothes', Ctrl_Feedback.get_feedback);

router.get('/accessory', Ctrl_Product_Type.accessory);
router.post('/accessory', Ctrl_Feedback.get_feedback);

//router.use(express.static('views'));

module.exports = router;


