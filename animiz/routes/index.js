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

/*  var products;
  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Information_Product");
    dbo.collection("List_product").find({}).toArray(function(err, result) {
      if (err) throw err;
    
//      console.log(result);
      var productChuck = [];
      var chucksize = 4;
      var keysearch = "kimetsu";
      var k_search = keysearch.toLowerCase();
      for(var i = 0; i < result.length; i++)
      {
        let name_key = result[i].title.toLowerCase();
        if(name_key.includes(k_search))
        {
          productChuck.push(result.slice(i,i+1));
        }
        
      }
      res.render('index', { title: 'Animiz', products: productChuck});
      db.close();
    });
  }); */
//  res.render('index', { title: 'Animiz', products: products});
    
  /*  if(req.query.search){
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      console.log("Hello" + regex);
      var products;
      MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
      if (err) throw err;
      var dbo = db.db("Information_Product");
      dbo.collection("List_product").find({}).toArray(function(err, result) {
      if (err) throw err;
      var list_search = [];
      var chucksize = 4;
      var keysearch = regex;
      console.log(keysearch);
      var k_search = keysearch.toLowerCase();
      for(var i = 0; i < result.length; i++)
      {
        let name_key = result[i].title.toLowerCase();
        if(name_key.includes(k_search))
        {
          list_search.push(result.slice(i,i+1));
        }
        
      }
      res.render('index', { title: 'Animiz', products: list_search});
      db.close();
    });
  }); 
    }
    else
    {
      res.render('index', { title: 'Animiz'});
    }
    */

   res.render('index', { title: 'Animiz'});
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

// Get Result Search Page

router.get('/search', function(req, res, next){
  const queryParams = req.query;
  const key_search = req.query.search;
  if(key_search != "")
  {

  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
  if (err) throw err;
  var dbo = db.db("Information_Product");
  dbo.collection("List_product").find({}).toArray(function(err, result) {
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
          productChuck.push(result.slice(i,i+1));
          check = true;
        }
        
      }
      if(check == false)
      {
        res.render('products_z/result_search', { title: 'There is no matching search value', products: productChuck});
      }
      else
      {
        res.render('products_z/result_search', { title: '', products: productChuck});
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
  const queryParams = req.query;
  const key_search = req.query.search;
 /* if(key_search != "")
  {

  MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
  if (err) throw err;
  var dbo = db.db("Information_Product");
  dbo.collection("List_product").find({}).toArray(function(err, result) {
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
          productChuck.push(result.slice(i,i+1));
          check = true;
        }
        
      }
      if(check == false)
      {
        res.render('users/user_search', { title: 'There is no matching search value', products: productChuck});
      }
      else
      {
        res.render('users/user_search', { title: '', products: productChuck});
      }
        

      db.close();
    });
  }); 
  }
  else{
    res.render('index_account', { title: 'Animiz'});
  } */
  var productChuck = [];
  res.render('users/user_search', { title: '', products: productChuck});
})

//router.use(express.static('views'));

module.exports = router;


