var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://JSSaini07:compilerideJSSaini07@ds013584.mlab.com:13584/compileride',function(err){
  if(err)
  {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

var codes=mongoose.model('codes',{code_id:String,lang:String,code:String,parameters:String,output:JSON});

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
    code_id=JSON.parse(body).code_id;
    output=JSON.parse(body);
    var r=new codes({code_id:code_id,lang:language,code:code,parameters:input,output:output});
    r.save();
    res.end(body);
  });
});

app.get('/getCode',function(req,res){
  search_code_id=req.query.code_id;
  codes.find({code_id:search_code_id},function(err,data){
    if(data.length==0)
    {
      res.end("");
    }
    else {
      result=data[0];
      res.end(JSON.stringify(result));
    }
  });
});

app.get('/',function(req,res){
  res.sendFile('/index.html');
});

var port=process.env.PORT||3030;

app.listen(port);
