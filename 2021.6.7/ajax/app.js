const express = require("express");
const app=express();
app.use(express.urlencoded({extended: true}))//支持获取post请求主体body
app.use(express.static("public"));
app.get("/test",(req,res)=>{
})
app.post("/test",(req,res)=>{
    // let {username}=req.body
    // let arr=["zs","ls","ww","syf","ds","gh"]
    // let re=arr.includes(username);
    // res.send(re?"用户名已被占用":"用户名可用")
    console.log(req.body)

})
app.listen(5000,(err)=>{
    if(err){
        console.log(err)
    }
})