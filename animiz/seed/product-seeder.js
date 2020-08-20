/*
var Product = require('../controllers/product');
var mongoose = require('mongoose');
const { exists } = require('../controllers/product');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imgPath: "/images/img/img_header/banner_1.jpg",
        title: "Anime 1",
        description: "anime1",
        price: 200
    }),
    new Product({
        imgPath: "/images/img/img_header/banner_1.jpg",
        title: "Anime 1",
        description: "anime1",
        price: 200
    }),
    new Product({
        imgPath: "/images/img/img_header/banner_1.jpg",
        title: "Anime 1",
        description: "anime1",
        price: 200
    }),
    new Product({
        imgPath: "/images/img/img_header/banner_1.jpg",
        title: "Anime 1",
        description: "anime1",
        price: 200
    }),
    new Product({
        imgPath: "/images/img/img_header/banner_1.jpg",
        title: "Anime 1",
        description: "anime1",
        price: 200
    }),
    new Product({
        imgPath: "/images/img/img_header/banner_1.jpg",
        title: "Anime 1",
        description: "anime1",
        price: 200
    })
];

var done = 0;

for(var i = 0; i <products.length; i++)
{
    products[i].save(function(err, result){
        done++;
        if(done == products.length){
            exit();
        }
    });
};

function exit(){
    mongoose.disconnect();
}
*/
/*
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017', function(err, db){
  if(err){
    throw err;
  }
  else{
    console.log("Connected");
  }
  var collection = db.Information_Product.find();
  db.close();
}); */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Information_Product");
  dbo.collection("List_product").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 