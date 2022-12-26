const mongoose=require('mongoose');


const userdetailsSchema=mongoose.Schema({
    username:String,
    password:String,
    role:String
})

module.exports=mongoose.Model("userDetails",userdetailsSchema);
