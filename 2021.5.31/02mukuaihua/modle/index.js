const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const SchemaObj=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    info:{
        type:Schema.Types.Mixed,
        default:"暂无"
    },
    set_Date:{
        type:Date,
        default:Date.now()
    },
    enable:{
        type:String,
        default:"Y"
    }
})
const users=mongoose.model("users",SchemaObj);
module.exports=users