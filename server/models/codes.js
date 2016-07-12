
var mongoose=require('mongoose');

DB_URL ='mongodb://JSSaini07:compilerideJSSaini07@ds013584.mlab.com:13584/compileride';//process.env.DB_URL

mongoose.connect(DB_URL);

var codes=mongoose.model('codes',{code_id:String,username:String,date:Date,lang:String,code:String,parameters:String,output:JSON});

module.exports=codes;
