const mongoose =require('mongoose');

const Questionschema=mongoose.Schema({
    Question:String,
    Message:String,
    Priority:Number,
    isSolved:Boolean,
    isTagged:Boolean,
    taggedTo:String,
    Reply:String,
    isReplied:Boolean
    
})

module.exports=mongoose.model("Question",Questionschema);