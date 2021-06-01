(async function (){
    const db=require("../db")
    await db
    const users=require("../modle")
    users.updateMany({ age: { $lt: 18 } },{$set:{info:"未成年"}},(err,data)=>{
        console.log(err,data)})
})()