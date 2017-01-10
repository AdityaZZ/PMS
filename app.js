var express = require('express');
var path = require('path');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');


// 数据库连接
global.dbHelper = require('./common/dbHelper');
global.db = mongoose.connect("mongodb://127.0.0.1:27017/PMS");
var app = express();

// 设置session


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }

}));
app.use(function(req, res, next){
    req.session._garbage = new Date();
    req.session.touch();
    next();
});

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    next();
});

// 引入路由
require('./routes')(app);

// 首页
app.get('/', function (req, res) {
    res.render('login');
});

app.listen(80,"127.0.0.1", function () {
    console.log("开始监听80端口");
});


