var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbRoute = require('./Persistence/dbRoute')
const mongoose = require('mongoose');
const passport = require("passport");

const format = require('util').format;
const Multer = require('multer');
const helmet = require('helmet');
// const Storage = require('@google-cloud/storage');
// const storage = Storage();

mongoose.connect(dbRoute, {useNewUrlParser:true});

let db = mongoose.connection;

db.once('open', ()=> console.log('Connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var formRouter = require('./controllers/formController')
var moduleRouter = require('./controllers/moduleController')
var uploadRouter = require('./controllers/assessmentUploadController')
var indexRouter2 = require('./controllers/index')
var userRouter = require("./controllers/userController");

var app = express();

app.enable('trust proxy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json({limit:10485760 }))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);
require("./config/passport")(passport);
// Routes
app.use("/api/users", userRouter);

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/uploads', uploadRouter);
app.use('/forms', formRouter);
app.use('/modules', moduleRouter)


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
