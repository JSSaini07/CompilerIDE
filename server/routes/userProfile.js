
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
              // date logic
                showSAtEnd={true:'',false:'s'};
                for(i=0;i<code_data.length;i++)
                {
                  date_difference=new Date()-new Date(code_data[i].date); // find time difference
                  date_difference=parseInt(date_difference/1000); // convert to seconds
                  if(date_difference<3600) {
                    date_difference='less than an hour ago';
                  }
                  else
                  if(date_difference<86400) {
                    date_difference=parseInt(date_difference/3600);
                    date_difference=(date_difference)+' hour'+showSAtEnd[!(date_difference-1)]+' ago';
                  }
                  else
                  if(date_difference<2592000) {
                    date_difference=parseInt((date_difference/86400));
                    date_difference=(date_difference)+' day'+showSAtEnd[!(date_difference-1)]+' ago';
                  }
                  else {
                    days_diff=date_difference%2592000;
                    days_diff=parseInt(days_diff/86400);
                    date_difference=parseInt(date_difference/2592000);
                    if(!days_diff)
                    {
                      date_difference=date_difference+' month'+showSAtEnd[!(date_difference-1)]+' ago';
                    }
                    else {
                      date_difference=date_difference+' month'+showSAtEnd[!(date_difference-1)]+' and '+days_diff+' day'+showSAtEnd[!(days_diff-1)]+' ago';
                    }
                  }
                  code_data[i]['date_difference']=date_difference;
                }
                
                res.render('user',{'data':[{'username':username,'fname':fname,'lname':lname,'codes':code_data}]});
            }).sort({$natural:-1});
      }
  });
});

module.exports=router;
