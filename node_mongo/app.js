var express = require('express');
// var bodyParser = require('body-parser')
var app = new express();  /*实例化*/
var DB=require('./modules/db')
var main_Router=require('./router/index')
// Connection URL@
const DbUrl = 'mongodb://localhost:27017';
// app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
// app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use('/upload',express.static('upload'))
app.use(express.static('public'));
app.use('/',main_Router)
app.listen(3003, '127.0.0.1');

