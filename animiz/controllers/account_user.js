/* GET 'user' page */

const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Password is not correct</p>`)

const account_user = (req, res) => {
    console.log(req.session.user);
    res.render('index_account', { title: 'User', username: req.session.user.username });
};
const User = require('../models/user');    
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = (req, res, next) => {
    User.findOne({$or: [{username: req.body.s_user_name}]})
    .then(user => {
        if(user){
            res.render('users/sign-up', {title: 'Sign Up', default: "Username available"});
        }
        else{
            bcrypt.hash(req.body.s_password,10, function(err, hashedPass){
                if(err){
                    res.json({
                        error: err
                    })
                }
                User.create({
                    username: req.body.s_user_name,
                    email: req.body.s_email,
                    password: hashedPass,
                    gender: req.body.s_gender
                }, function(err, newUser){
                    if(err){
                        throw err
                    };
                    console.log("Create new student with id ", newUser._id);
                    res.redirect('/login');
                });
            })
        }
    })
  
    
    
}

const login = (req, res, next) => {
    var username = req.body.l_username;
    var password = req.body.l_password;
    User.findOne({$or: [{username: username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
               
                if(err){
                    throw err
                }
                if(result){
                    let token = jwt.sign({name: username}, 'verySecretValue', {expiresIn: '1h'});
                    req.session.user = user;
               
                    res.redirect('/');
                   
                }
                else{
                    res.render('users/login', {title: 'Login Form', default: "Password is not correct"});
                }
            })
            
        }
        else{
            res.render('users/login', {title: 'Login Form', default: "Username is not correct"});
        }
    })
}

const logout = (req, res, next) => {
    req.session.user = "";
    res.redirect('/');
}

module.exports = {account_user, register, login, logout};