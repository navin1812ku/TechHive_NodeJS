const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
const User=mongoose.model('User',new mongoose.Schema({
    id:Number,
    fname:String,
    lname:String,
    email:String,
    mobile:Number,
    services:Array
}));
module.exports=User;