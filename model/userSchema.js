const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
workType:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
confirmpassword:{
    type:String,
    required:true
}

})

//Creating a model for User Schema
const User=mongoose.model('USER',userSchema);
module.exports=User;