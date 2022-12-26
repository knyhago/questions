const mongoose = require('mongoose');

const officialSchema = mongoose.Schema({
    Name:String,
    EmailId:{
        type:String,
        lowercase:true
    },
    Position:String,
    Department:String
})

module.exports=mongoose.model("Officials",officialSchema)
