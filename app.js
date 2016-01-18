var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var logOut = require('./routes/logout');
var post = require('./routes/post');
var register = require('./routes/register');
var routes = require('./routes/index');
var search = require('./routes/search');
var users = require('./routes/users');
var validateUser = require('./routes/validate-user');
var session = require('express-session');
var mongoose = require('mongoose');
var app = express();
var Mongo = require('./mongo_conn').Mongo;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('123 123'));
app.use(session({secret: 'IDDQD'}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var mongo = new Mongo('127.0.0.1', 27017);

app.use(function (req, res, next) {
    req.db = mongo;
    
    //serve favicon if requested, messes with mocha otherwise
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested');
    return;
  }
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/getuser', require('./routes/getuser.js'));
app.use('/login', login);
app.use('/logout', logOut);
app.use('/post', post);
app.use('/register', register);
app.use('/search', search);
app.use('/validate-user', validateUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8888);

module.exports = app;
