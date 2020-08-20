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
  var products;
  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Information_Product");
    dbo.collection("List_product").find({}).toArray(function(err, result) {
      if (err) throw err;
    
//      console.log(result);
      var productChuck = [];
      var chucksize = 3;
      for(var i = 0; i < result.length; i++)
      {
        productChuck.push(result.slice(i,i+1));
      }
      res.render('index', { title: 'Animiz', products: productChuck});
      console.log(productChuck);
      console.log("Hello");
      db.close();
    });
  });
//  res.render('index', { title: 'Animiz', products: products});
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

// 



//router.use(express.static('views'));

module.exports = router;


