
var mongoose=require('mongoose');

DB_URL=process.env.DB_URL

mongoose.connect(DB_URL);

var codes=mongoose.model('codes',{code_id:String,username:String,date:String,lang:String,code:String,parameters:String,output:JSON});

module.exports=codes;