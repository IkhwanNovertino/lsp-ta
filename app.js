var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');

var authRouter = require('./routes/login');

var indexRouter = require('./routes/index');
var sertifikasiRouter = require('./routes/sertifikasi');
var forumRouter = require('./routes/forum');
var daftarRouter = require('./routes/daftar');
var dashboardRouter = require('./routes/admin/dashboard');
var pengajuanRouter = require('./routes/admin/pengajuan');
var exportRouter = require('./routes/admin/export');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//konfig express-session dan flash
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash());

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/adminlte", express.static(path.join(__dirname, '/node_modules/admin-lte')))

app.use('/', indexRouter);
app.use('/sertifikasi', sertifikasiRouter);
app.use('/forum', forumRouter);
app.use('/daftar', daftarRouter);
app.use('/dashboard', dashboardRouter);
app.use('/pengajuan', pengajuanRouter);
app.use('/export', exportRouter);
app.use('/login', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
