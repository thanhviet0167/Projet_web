var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://animiz:animiz@cluster0.yfhgm.mongodb.net";
var express = require('express');

const feature = (req, res, next) => {



    

    MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Product");
  

    dbo.collection("List_Product").find({}).toArray(function(err, result) {
        if (err) throw err;
        var male_product = [];
        var female_product = [];
        var unisex_product = [];
        var accessory_product = [];
        var male_count = 0, female_count = 0, unisex_count = 0, accessory_count = 0;

        for(var i = 0; i < result.length; i++)
        {
            if(result[i].type == "male" && male_count < 4)
            {
                male_product.push(result.slice(i,i+1));
                male_count++;
            }
            if(result[i].type == "female" && female_count < 4)
            {
                female_product.push(result.slice(i,i+1));
                female_count++;
            }
            if(result[i].isunisex == "yes" && unisex_count < 4)
            {
                unisex_product.push(result.slice(i,i+1));
                unisex_count++;
            }
            if(result[i].type == "other" && accessory_count < 4)
            {
                accessory_product.push(result.slice(i,i+1));
                accessory_count++;
            }
        }
        
  
            res.render('products_z/product_type/feature', { title: 'Feature', male:male_product, female:female_product,
            unisex:unisex_product,accessory:accessory_product, account: req.session.user});
            

        db.close();
        });
    }); 
};


const male = (req, res, next) => {
  

    var url_price = req.query.sort;
   
    
    

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
        var product = [];
    
        for(var i = 0; i < result.length; i++)
        {
          
            if(result[i].type == 'male')
            {
                product.push(result.slice(i,i+1));
                check = true;
            }
        
            
        }
        
       
      
            res.render('products_z/product_type/male_clothes', { title: 'Male Clothes', products: product, account: req.session.user});
     
            

        db.close();
        });
    }); 
 
};

const female = (req, res, next) => {
  

    var url_price = req.query.sort;
   
    
    

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
        var product = [];
    
        for(var i = 0; i < result.length; i++)
        {
          
            if(result[i].type == 'female')
            {
                product.push(result.slice(i,i+1));
                check = true;
            }
        
            
        }
        
       
      
            res.render('products_z/product_type/female_clothes', { title: 'Female Clothes', products: product, account: req.session.user});
     
            

        db.close();
        });
    }); 
 
};

const unisex = (req, res, next) => {
  

    var url_price = req.query.sort;
   
    
    

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
        var product = [];
    
        for(var i = 0; i < result.length; i++)
        {
          
            if(result[i].isunisex == 'yes')
            {
                product.push(result.slice(i,i+1));
                check = true;
            }
        
            
        }
        
       
      
            res.render('products_z/product_type/unisex_clothes', { title: 'Unisex Clothes', products: product, account: req.session.user});
     
            

        db.close();
        });
    }); 
 
};

const accessory = (req, res, next) => {
  

    var url_price = req.query.sort;
   
    
    

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
        var product = [];
    
        for(var i = 0; i < result.length; i++)
        {
          
            if(result[i].type == 'other')
            {
                product.push(result.slice(i,i+1));
                check = true;
            }
        
            
        }
        
       
      
            res.render('products_z/product_type/accessory', { title: 'Accessory', products: product, account: req.session.user});
     
            

        db.close();
        });
    }); 
 
};

module.exports = {feature, male, female, unisex, accessory}