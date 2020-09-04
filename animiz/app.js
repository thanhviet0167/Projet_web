var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var expressHbs = require('express-handlebars');

var session = require('express-session');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

app.set('trust proxy', 1) // trust first proxy
//app.use(expressValidator());
app.use(expressSession({
  secret: 'max',
  saveUninitialized: false,
  resave: false
}));
//var mongodb = require('mongoose');
/*
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017', function(err, db){
  if(err){
    throw err;
  }
  else{
    console.log("Connected");
  }
  db.close();
}); */
//mongodb.connect('localhost:27017/shopping');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false }));
//app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname:'.hbs'}));
//app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
