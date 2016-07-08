var express = require('express');
var session=require('express-session');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var index=require('./server/routes/index.js');
var run=require('./server/routes/run.js');
var savedCodeView=require('./server/routes/savedCodeView.js');
var register=require('./server/routes/register.js');
var login=require('./server/routes/login.js');
var logout=require('./server/routes/logout.js');
var userProfile=require('./server/routes/userProfile.js');
var app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:'ssshhhhh'}));
app.use(morgan('dev'));
app.set('view engine','jade');
app.set('views','public/views');
app.use(express.static(__dirname+'/public'));

RUN_URL = 'http://api.hackerearth.com/code/run/'
CLIENT_SECRET = process.env.CLIENT_SECRET

app.get('/',index);
app.get('/run',run);
app.get('/code/:code_id',savedCodeView);
app.get('/register',register);
app.post('/register',register);
app.get('/login',login);
app.post('/login',login);
app.get('/logout',logout);
app.get('/user/:username',userProfile);

var port=process.env.PORT||3030;

app.listen(port);
