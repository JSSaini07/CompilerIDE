
var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
  console.log(req.session.username);
  res.render('index',{'data':[{'username':req.session.username}]});
});

module.exports=router;