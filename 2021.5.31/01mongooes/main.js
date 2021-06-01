
(async  function (){
    const mongoose=require("mongoose")
    mongoose.set('useCreateIndex', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/web0323', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("连接数据库成功")
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
    // users.create({
    //     name:"ww",
    //     age:19,
    // },{
    //     name:"syf",
    //     age:16,
    // },{
    //     name:"wwy",
    //     age:13,
    // },{
    //     name:"dfg",
    //     age:19,
    // })
    // users.updateMany({ age: { $lte: 18 } },{$set:{info:"未成年"}},(err,data)=>{
    //     console.log(err,data)})
    users.updateMany({ age: { $gte: 18 } },{$set:{info:"成年"}},(err,data)=>{
        console.log(err,data)})
    // users.find({ age: { $lte:8 } },{_id:0},(err,data)=>{
    //         console.log(err,data)})
    // users.find({age:18},{_id:0},(err,data)=>{
    //     console.log(err,data)})
})()
