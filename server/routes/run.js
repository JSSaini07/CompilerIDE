
var express=require('express');
var router=express.Router();
var codes=require('../models/codes');
var request = require('request');

router.get('/run',function(req,res){
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
      try{
        code_id=JSON.parse(body).code_id;
        output=JSON.parse(body);
        date=new Date();
        username="";
        if(req.session.username!=undefined)
        {
            username=req.session.username;
        }
        var r=new codes({code_id:code_id,username:username,date:date,lang:language,code:code,parameters:input,output:output});
        r.save();
        res.end(body);
      }catch(e){}
    });
});

module.exports=router;
