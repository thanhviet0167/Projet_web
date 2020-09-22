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
            if(result[i].type == "male" && male_count < 6)
            {
                male_product.push(result.slice(i,i+1));
                male_count++;
            }
            if(result[i].type == "female" && female_count < 6)
            {
                female_product.push(result.slice(i,i+1));
                female_count++;
            }
            if(result[i].isunisex == "yes" && unisex_count < 6)
            {
                unisex_product.push(result.slice(i,i+1));
                unisex_count++;
            }
            if(result[i].type == "other" && accessory_count < 6)
            {
                accessory_product.push(result.slice(i,i+1));
                accessory_count++;
            }
        }
        
  
            res.render('products_z/product_type/feature', { title: 'Feature', male:male_product, female:female_product,
            unisex:unisex_product,accessory:accessory_product});
            

        db.close();
        });
    }); 
};


module.exports = {feature}