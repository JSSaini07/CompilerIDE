
var express=require('express');
var codes=require('../models/codes');
var router=express.Router();

router.get('/code/:code_id',function(req,res){
  search_code_id=req.params.code_id;
  codes.find({code_id:search_code_id},function(err,data){
    if(data.length==0)
    {
      res.end("");
    }
    else {
      result=data[0];
      result=JSON.stringify(result);
      res.render('index',{'data':[{'username':req.session.username,'response':result}]});
    }
  });
});

module.exports=router;