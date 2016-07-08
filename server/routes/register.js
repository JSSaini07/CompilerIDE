
var express=require('express');
var router=express.Router();
var users=require('../models/users.js');
var bodyParser=require('body-parser');

router.get('/register',function(req,res){
    res.render('register');
});

router.post('/register',function(req,res){
    users.findOne({'username':req.body.userName},function(error,data){
        if(data) {
          res.end("<kbd>Username already taken</kbd>");
        }
        else {
            users.findOne({'email':req.body.email},function(error,data){
              if(data) {
                res.end("<kbd>Email ID already registered</kbd>");
              }
              else {
                saveUser();
              }
            });
        }
    });
    function saveUser() {
      user=new users({fname:req.body.fname,lname:req.body.lname,username:req.body.userName,email:req.body.email,password:req.body.password});
      user.save();
      req.session.username=req.body.userName;
      res.end("");
    }
});

module.exports=router;