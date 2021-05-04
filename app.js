var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
bodyParser = require('body-parser'),

//(start) config
dotenv.config();
//(end) config

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//(start) Allow CORS to access system
app.use((res,req,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Headers",
  "Authorization,Origin,Content-Type,Accept,X-Requested-With");
  if(res.method === "OPTIONS"){
      res.header("Access-Control-Allow-Methods",
      "PUT,GET,POST,DELETE,PATCH");
      return res.status(200).json({});
  }
  next();
})
//(end) Allow CORS to access system

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiRouter);

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
  res.send('error');
});

app.listen(process.env.APP_PORT, function () {
  console.log(process.env.APP_URL + ':' + process.env.APP_PORT + ' is active now')
});

module.exports = app;
