var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//匯入各種會使用到的套件

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//匯入初始路由
var api = require('./routes/api'); //引入API

var app = express();//使用Express作為Web框架

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //

app.use(logger('dev'));  //紀錄http請求
app.use(express.json());//可讀取JSON格式
app.use(express.urlencoded({ extended: false }));//可讀取urlencoded格式
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//定義路由位置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',api);
app.use('/public',express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
