const express = require("express");
const app=express();
app.use(express.urlencoded({extended: true}))//支持获取post请求主体body
app.use(express.static("public"));
app.get("/test",(req,res)=>{
    let {callback}=req.query;
    let arr=[1,2,3,4,5,6]
    res.send(`${callback}(${JSON.stringify(arr)})`)
})
app.post("/test",(req,res)=>{


})
app.listen(5000,(err)=>{
    if(err){
        console.log(err)
    }
})