
var express=require('express');
var router=express.Router();

router.get('/logout',function(req,res){
    req.session.username=undefined;
    res.redirect('/');
});

module.exports=router;