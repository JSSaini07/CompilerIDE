
var mongoose=require('mongoose');

var users=mongoose.model('users',{fname:String,lname:String,username:String,email:String,password:String});

module.exports=users;