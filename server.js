var express = require('express');
var request = require('request');
var app = express();

app.use(express.static(__dirname+'/includes'));

RUN_URL = 'http://api.hackerearth.com/code/run/'
CLIENT_SECRET = 'bea98ae9dcbc79df09271f0ffc5bfe7e13c2a2c6'

app.get('/run',function(req,res){
  language=req.query.lang;
  code=req.query.code;
  input=req.query.input;
  request({
    url: RUN_URL,
    method: "POST",
    form:{
      'client_secret': CLIENT_SECRET,
      'async': 0,
      'input':input,
      'source': code,
      'lang': language,
      'time_limit': 5,
      'memory_limit': 262144,
    }
  },function(error,response,body) {
    res.end(body);
  });
});

app.get('/',function(req,res){
  res.sendFile('/index.html');
});

var port=process.env.PORT||3030;

app.listen(port);
