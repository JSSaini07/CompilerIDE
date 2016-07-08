
var express=require('express');
var router=express.Router();
var users=require('../models/users');

router.get('/login',function(req,res){
    res.render('login');
});

router.post('/login',function(req,res){
    username=req.body.username;
    password=req.body.password;
    error="";
    users.findOne({'username':username},function(error,data){
      console.log(data);
        if(data)
        {
            if(data.password==password)
            {
              req.session.username=username;
            }
            else
            {
              error="<kbd>Invalid username password combination.</kbd>";
            }
        }
        else
        {
            error="<kbd>User does not exist.</kbd>";
        }
        endResponse(error);
    });
    
    function endResponse(error)
    {
        res.end(error);
    }
});

module.exports=router;