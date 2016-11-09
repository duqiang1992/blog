var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
//静态文件中间件
app.use(express.static(path.resolve('public')));

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'dq',
    cookie:{maxAge:1000000000*1000},
    store:new MongoStore({
        //将数据存储到session中，防止服务器停止后，数据丢失
        url:'mongodb://127.0.0.1/1608blog'
    })
}));
app.use(function (req,res,next) {
    res.locals.user =req.session.user;
    next();
});

var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');

app.use('/',index);
app.use('/user',user);
app.use('/article',article);

//加载模版引擎
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);

app.listen(5598);