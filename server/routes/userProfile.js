
var express=require('express');
var users=require('../models/users');
var codes=require('../models/codes');
var router=express.Router();

router.get('/user/:username',function(req,res){
  username=req.params.username;
  users.find({username:username},function(err,user_data){
      if(user_data.length==0)
      {
        res.end("Unauthorized Access");
      }
      else
      {
            fname=user_data[0].fname;
            lname=user_data[0].lname;
            codes.find({username:username},function(err,code_data){
                res.render('user',{'data':[{'username':username,'fname':fname,'lname':lname,'codes':code_data}]});
            }).sort({$natural:-1});
      }
  });
});

module.exports=router;